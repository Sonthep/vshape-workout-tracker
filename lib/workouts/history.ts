import type { SupabaseClient } from "@supabase/supabase-js";
import { program } from "@/lib/workouts/program";
import type { SessionExerciseView } from "@/lib/workouts/session";

export type HistoryListItem = {
  id: string;
  programDay: 1 | 2 | 3 | 4;
  weekday: string;
  titleTh: string;
  completedAt: string;
  completedSets: number;
  totalSets: number;
  totalVolumeKg: number;
};

export type SessionSummary = {
  totalSets: number;
  completedSets: number;
  totalVolumeKg: number;
  previousVolumeKg: number | null;
  totalDurationSeconds: number;
};

/**
 * Total working volume from completed rep-based sets only; duration-based
 * sets (planks, etc.) don't have a weight×reps volume and are excluded.
 */
export function calculateVolumeKg(logs: { weightKg: number | null; reps: number | null }[]): number {
  return logs.reduce(
    (total, log) => total + (log.weightKg !== null && log.reps !== null ? log.weightKg * log.reps : 0),
    0,
  );
}

/**
 * Rolls a session's exercises (each already carrying this session's set
 * logs and the matching previous session's set logs, per getSessionDetail)
 * into totals for the finish summary and history detail views.
 */
export function summarizeSession(exercises: SessionExerciseView[]): SessionSummary {
  let totalSets = 0;
  let completedSets = 0;
  let totalDurationSeconds = 0;
  let hasPreviousData = false;
  const currentLogs: { weightKg: number | null; reps: number | null }[] = [];
  const previousLogs: { weightKg: number | null; reps: number | null }[] = [];

  for (const exercise of exercises) {
    totalSets += exercise.targetSets;
    for (const log of Object.values(exercise.setLogs)) {
      if (log.completedAt !== null) completedSets += 1;
      if (log.durationSeconds !== null) totalDurationSeconds += log.durationSeconds;
      currentLogs.push(log);
    }
    for (const log of Object.values(exercise.previousSets)) {
      hasPreviousData = true;
      previousLogs.push(log);
    }
  }

  return {
    totalSets,
    completedSets,
    totalVolumeKg: calculateVolumeKg(currentLogs),
    previousVolumeKg: hasPreviousData ? calculateVolumeKg(previousLogs) : null,
    totalDurationSeconds,
  };
}

export function formatVolumeDelta(current: number, previous: number | null): string | null {
  if (previous === null || previous <= 0) return null;
  const deltaPercent = Math.round(((current - previous) / previous) * 100);
  if (deltaPercent === 0) return "Same total volume as last time";
  const direction = deltaPercent > 0 ? "▲" : "▼";
  return `${direction} ${Math.abs(deltaPercent)}% vs last time`;
}

type CompletedSessionRow = {
  id: string;
  program_day: 1 | 2 | 3 | 4;
  completed_at: string;
};

type ExerciseRow = {
  id: string;
  session_id: string;
  target_sets: number;
};

type SetLogRow = {
  workout_exercise_id: string;
  weight_kg: number | null;
  reps: number | null;
  completed_at: string | null;
};

export async function listCompletedSessions(
  supabase: SupabaseClient,
  userId: string,
): Promise<HistoryListItem[]> {
  const { data: sessionRows, error: sessionsError } = await supabase
    .from("workout_sessions")
    .select("id, program_day, completed_at")
    .eq("user_id", userId)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false });

  if (sessionsError) throw new Error(sessionsError.message);
  const sessions = (sessionRows ?? []) as CompletedSessionRow[];
  if (sessions.length === 0) return [];

  const sessionIds = sessions.map((row) => row.id);
  const { data: exerciseRows, error: exercisesError } = await supabase
    .from("workout_exercises")
    .select("id, session_id, target_sets")
    .in("session_id", sessionIds);
  if (exercisesError) throw new Error(exercisesError.message);

  const exercises = (exerciseRows ?? []) as ExerciseRow[];
  const workoutExerciseIds = exercises.map((row) => row.id);

  const { data: setLogRows, error: setLogsError } = workoutExerciseIds.length
    ? await supabase
        .from("set_logs")
        .select("workout_exercise_id, weight_kg, reps, completed_at")
        .in("workout_exercise_id", workoutExerciseIds)
    : { data: [] as SetLogRow[], error: null };
  if (setLogsError) throw new Error(setLogsError.message);

  const exercisesBySession = new Map<string, ExerciseRow[]>();
  for (const row of exercises) {
    const list = exercisesBySession.get(row.session_id) ?? [];
    list.push(row);
    exercisesBySession.set(row.session_id, list);
  }

  const logsByWorkoutExercise = new Map<string, SetLogRow[]>();
  for (const row of (setLogRows ?? []) as SetLogRow[]) {
    const list = logsByWorkoutExercise.get(row.workout_exercise_id) ?? [];
    list.push(row);
    logsByWorkoutExercise.set(row.workout_exercise_id, list);
  }

  return sessions.map((row) => {
    const workout = program.find((item) => item.day === row.program_day);
    const sessionExercises = exercisesBySession.get(row.id) ?? [];
    const totalSets = sessionExercises.reduce((sum, exercise) => sum + exercise.target_sets, 0);
    const logs = sessionExercises.flatMap((exercise) => logsByWorkoutExercise.get(exercise.id) ?? []);

    return {
      id: row.id,
      programDay: row.program_day,
      weekday: workout?.weekday ?? "",
      titleTh: workout?.titleTh ?? "",
      completedAt: row.completed_at,
      completedSets: logs.filter((log) => log.completed_at !== null).length,
      totalSets,
      totalVolumeKg: calculateVolumeKg(logs.map((log) => ({ weightKg: log.weight_kg, reps: log.reps }))),
    };
  });
}
