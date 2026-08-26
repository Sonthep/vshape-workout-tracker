import type { SupabaseClient } from "@supabase/supabase-js";
import type { SetLog } from "@/lib/domain/types";
import { program } from "@/lib/workouts/program";

export type SessionExerciseView = {
  id: string;
  exerciseId: string;
  name: string;
  position: number;
  targetSets: number;
  targetRepMin: number | null;
  targetRepMax: number | null;
  targetSecondsMin: number | null;
  targetSecondsMax: number | null;
  setLogs: Record<number, SetLog>;
  previousSets: Record<number, SetLog>;
};

export type SessionDetail = {
  id: string;
  programDay: 1 | 2 | 3 | 4;
  startedAt: string;
  completedAt: string | null;
  exercises: SessionExerciseView[];
};

type WorkoutExerciseRow = {
  id: string;
  exercise_id: string;
  position: number;
  target_sets: number;
  target_rep_min: number | null;
  target_rep_max: number | null;
  target_seconds_min: number | null;
  target_seconds_max: number | null;
};

type SetLogRow = {
  id: string;
  workout_exercise_id: string;
  set_number: number;
  weight_kg: number | null;
  reps: number | null;
  duration_seconds: number | null;
  rir: number | null;
  completed_at: string | null;
};

export function isDurationExercise(exercise: { targetSecondsMin: number | null }): boolean {
  return exercise.targetSecondsMin !== null;
}

function mapSetLogRow(row: SetLogRow): SetLog {
  return {
    id: row.id,
    workoutExerciseId: row.workout_exercise_id,
    setNumber: row.set_number,
    weightKg: row.weight_kg,
    reps: row.reps,
    durationSeconds: row.duration_seconds,
    rir: row.rir,
    completedAt: row.completed_at,
  };
}

/**
 * Groups set logs by their own workout_exercise id (same session).
 */
export function indexSetLogsByWorkoutExercise(logs: SetLog[]): Map<string, Record<number, SetLog>> {
  const result = new Map<string, Record<number, SetLog>>();
  for (const log of logs) {
    const bucket = result.get(log.workoutExerciseId) ?? {};
    bucket[log.setNumber] = log;
    result.set(log.workoutExerciseId, bucket);
  }
  return result;
}

/**
 * Groups a previous session's set logs by exercise id (not workout_exercise id,
 * since that id is different per session) so they can be matched against the
 * current session's exercises regardless of workout_exercise identity.
 */
export function indexPreviousSetLogsByExercise(
  exercises: { id: string; exerciseId: string }[],
  logs: SetLog[],
): Map<string, Record<number, SetLog>> {
  const exerciseIdByWorkoutExerciseId = new Map(exercises.map((e) => [e.id, e.exerciseId]));
  const result = new Map<string, Record<number, SetLog>>();
  for (const log of logs) {
    const exerciseId = exerciseIdByWorkoutExerciseId.get(log.workoutExerciseId);
    if (!exerciseId) continue;
    const bucket = result.get(exerciseId) ?? {};
    bucket[log.setNumber] = log;
    result.set(exerciseId, bucket);
  }
  return result;
}

export function parseNullableNumber(value: FormDataEntryValue | null): number | null {
  if (value === null) return null;
  const trimmed = String(value).trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatSetValue(log: SetLog | undefined, isDuration: boolean): string {
  if (!log || log.completedAt === null) return "—";
  if (isDuration) return log.durationSeconds !== null ? `${log.durationSeconds} sec` : "—";
  const parts: string[] = [];
  if (log.weightKg !== null) parts.push(`${log.weightKg} kg`);
  if (log.reps !== null) parts.push(`${log.reps} reps`);
  if (parts.length === 0) return "—";
  let value = parts.join(" × ");
  if (log.rir !== null) value += ` (RIR ${log.rir})`;
  return value;
}

export function formatPreviousSetHint(log: SetLog | undefined, isDuration: boolean): string | null {
  if (!log) return null;
  if (isDuration) {
    return log.durationSeconds !== null ? `Last: ${log.durationSeconds} sec` : null;
  }
  const parts: string[] = [];
  if (log.weightKg !== null) parts.push(`${log.weightKg} kg`);
  if (log.reps !== null) parts.push(`${log.reps} reps`);
  if (parts.length === 0) return null;
  let hint = `Last: ${parts.join(" × ")}`;
  if (log.rir !== null) hint += ` (RIR ${log.rir})`;
  return hint;
}

/**
 * Finds an in-progress session for the given day, or creates one and snapshots
 * the current program's prescriptions into workout_exercises so a later
 * program change never rewrites what the user actually did.
 */
export async function findOrCreateSession(
  supabase: SupabaseClient,
  userId: string,
  day: number,
): Promise<{ id: string }> {
  const workout = program.find((item) => item.day === day);
  if (!workout) {
    throw new Error(`Unknown workout day: ${day}`);
  }

  const { data: existing, error: existingError } = await supabase
    .from("workout_sessions")
    .select("id")
    .eq("user_id", userId)
    .eq("program_day", day)
    .is("completed_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (existing) return { id: existing.id };

  const { data: session, error: sessionError } = await supabase
    .from("workout_sessions")
    .insert({ user_id: userId, program_day: day })
    .select("id")
    .single();

  if (sessionError || !session) {
    throw new Error(sessionError?.message ?? "Failed to start session");
  }

  const exerciseRows = workout.exercises.map((exercise, index) => ({
    session_id: session.id,
    exercise_id: exercise.id,
    position: index + 1,
    target_sets: exercise.sets,
    target_rep_min: exercise.repMin ?? null,
    target_rep_max: exercise.repMax ?? null,
    target_seconds_min: exercise.secondsMin ?? null,
    target_seconds_max: exercise.secondsMax ?? null,
  }));

  const { error: exercisesError } = await supabase.from("workout_exercises").insert(exerciseRows);
  if (exercisesError) throw new Error(exercisesError.message);

  return { id: session.id };
}

async function getPreviousSets(
  supabase: SupabaseClient,
  userId: string,
  programDay: number,
  excludeSessionId: string,
): Promise<Map<string, Record<number, SetLog>>> {
  const { data: previousSession } = await supabase
    .from("workout_sessions")
    .select("id")
    .eq("user_id", userId)
    .eq("program_day", programDay)
    .neq("id", excludeSessionId)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!previousSession) return new Map();

  const { data: previousExerciseRows } = await supabase
    .from("workout_exercises")
    .select("id, exercise_id")
    .eq("session_id", previousSession.id);

  const previousExercises = (previousExerciseRows ?? []).map((row) => ({
    id: row.id as string,
    exerciseId: row.exercise_id as string,
  }));
  if (previousExercises.length === 0) return new Map();

  const { data: previousLogRows } = await supabase
    .from("set_logs")
    .select("id, workout_exercise_id, set_number, weight_kg, reps, duration_seconds, rir, completed_at")
    .in("workout_exercise_id", previousExercises.map((e) => e.id));

  const previousLogs = (previousLogRows ?? []).map(mapSetLogRow);
  return indexPreviousSetLogsByExercise(previousExercises, previousLogs);
}

export async function getSessionDetail(
  supabase: SupabaseClient,
  sessionId: string,
  userId: string,
): Promise<SessionDetail | null> {
  const { data: session } = await supabase
    .from("workout_sessions")
    .select("id, user_id, program_day, started_at, completed_at")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.user_id !== userId) return null;

  const { data: exerciseRows } = await supabase
    .from("workout_exercises")
    .select("id, exercise_id, position, target_sets, target_rep_min, target_rep_max, target_seconds_min, target_seconds_max")
    .eq("session_id", sessionId)
    .order("position", { ascending: true });

  const exercises: WorkoutExerciseRow[] = exerciseRows ?? [];
  const exerciseIds = [...new Set(exercises.map((e) => e.exercise_id))];
  const workoutExerciseIds = exercises.map((e) => e.id);

  const [namesResult, setLogsResult, previousSets] = await Promise.all([
    exerciseIds.length
      ? supabase.from("exercises").select("id, name").in("id", exerciseIds)
      : Promise.resolve({ data: [] as { id: string; name: string }[] }),
    workoutExerciseIds.length
      ? supabase
          .from("set_logs")
          .select("id, workout_exercise_id, set_number, weight_kg, reps, duration_seconds, rir, completed_at")
          .in("workout_exercise_id", workoutExerciseIds)
      : Promise.resolve({ data: [] as SetLogRow[] }),
    getPreviousSets(supabase, userId, session.program_day, sessionId),
  ]);

  const nameById = new Map((namesResult.data ?? []).map((row) => [row.id, row.name]));
  const setLogsByWorkoutExercise = indexSetLogsByWorkoutExercise(
    ((setLogsResult.data ?? []) as SetLogRow[]).map(mapSetLogRow),
  );

  return {
    id: session.id,
    programDay: session.program_day,
    startedAt: session.started_at,
    completedAt: session.completed_at,
    exercises: exercises.map((row) => ({
      id: row.id,
      exerciseId: row.exercise_id,
      name: nameById.get(row.exercise_id) ?? row.exercise_id,
      position: row.position,
      targetSets: row.target_sets,
      targetRepMin: row.target_rep_min,
      targetRepMax: row.target_rep_max,
      targetSecondsMin: row.target_seconds_min,
      targetSecondsMax: row.target_seconds_max,
      setLogs: setLogsByWorkoutExercise.get(row.id) ?? {},
      previousSets: previousSets.get(row.exercise_id) ?? {},
    })),
  };
}
