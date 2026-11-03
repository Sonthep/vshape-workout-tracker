"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isBodyweightExercise, parseNullableNumber, validateSetInput } from "@/lib/workouts/session";

export type LogSetResult =
  | { error: string; shouldStartRest?: never }
  | { error: null; shouldStartRest: boolean };

export async function logSet(formData: FormData): Promise<LogSetResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sessionId = String(formData.get("sessionId"));
  const workoutExerciseId = String(formData.get("workoutExerciseId"));
  const setNumber = Number(formData.get("setNumber"));

  const input = {
    setNumber,
    weightKg: parseNullableNumber(formData.get("weightKg")),
    reps: parseNullableNumber(formData.get("reps")),
    durationSeconds: parseNullableNumber(formData.get("durationSeconds")),
    rir: parseNullableNumber(formData.get("rir")),
  };

  const { data: exercise, error: exerciseError } = await supabase
    .from("workout_exercises")
    .select("exercise_id, target_sets, target_seconds_min, workout_sessions!inner(user_id, completed_at)")
    .eq("id", workoutExerciseId)
    .eq("session_id", sessionId)
    .eq("workout_sessions.user_id", user.id)
    .maybeSingle();
  if (exerciseError) {
    console.error("logSet: load workout_exercise failed", exerciseError);
    return { error: "โหลดข้อมูลท่าไม่สำเร็จ กรุณาลองอีกครั้ง" };
  }
  if (!exercise) return { error: "ไม่พบท่าในเซสชันนี้ กรุณารีเฟรชหน้า" };

  const session = Array.isArray(exercise.workout_sessions)
    ? exercise.workout_sessions[0]
    : exercise.workout_sessions;
  if (session?.completed_at) return { error: "เซสชันนี้จบแล้ว ไม่สามารถบันทึกเพิ่มได้" };

  if (isBodyweightExercise(exercise.exercise_id)) input.weightKg = null;

  const validationError = validateSetInput(input, {
    targetSets: exercise.target_sets,
    isDuration: exercise.target_seconds_min !== null,
  });
  if (validationError) return { error: validationError };

  const { data: existingLog, error: existingError } = await supabase
    .from("set_logs")
    .select("completed_at")
    .eq("workout_exercise_id", workoutExerciseId)
    .eq("set_number", setNumber)
    .maybeSingle();

  if (existingError) {
    console.error("logSet: check existing set_log failed", existingError);
    return { error: "ตรวจสอบเซตเดิมไม่สำเร็จ กรุณาลองอีกครั้ง" };
  }

  const { error } = await supabase.from("set_logs").upsert(
    {
      workout_exercise_id: workoutExerciseId,
      set_number: setNumber,
      weight_kg: input.weightKg,
      reps: input.reps,
      duration_seconds: input.durationSeconds,
      rir: input.rir,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "workout_exercise_id,set_number" },
  );

  if (error) {
    console.error("logSet: upsert set_log failed", error);
    return { error: "บันทึกเซตไม่สำเร็จ กรุณาตรวจสอบข้อมูลแล้วลองอีกครั้ง" };
  }

  revalidatePath(`/session/${sessionId}`);
  return { error: null, shouldStartRest: existingLog?.completed_at == null };
}

export async function finishSession(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sessionId = String(formData.get("sessionId"));

  const { data: exercises, error: exercisesError } = await supabase
    .from("workout_exercises")
    .select("id, target_sets, workout_sessions!inner(user_id)")
    .eq("session_id", sessionId)
    .eq("workout_sessions.user_id", user.id);
  if (exercisesError) throw new Error(exercisesError.message);
  if (!exercises?.length) throw new Error("Workout session not found.");

  const { data: completedLogs, error: logsError } = await supabase
    .from("set_logs")
    .select("workout_exercise_id, set_number")
    .in("workout_exercise_id", exercises.map((exercise) => exercise.id))
    .not("completed_at", "is", null);
  if (logsError) throw new Error(logsError.message);
  const completedKeys = new Set((completedLogs ?? []).map((log) => `${log.workout_exercise_id}:${log.set_number}`));
  const isComplete = exercises.every((exercise) =>
    Array.from({ length: exercise.target_sets }, (_, index) => index + 1).every(
      (setNumberValue) => completedKeys.has(`${exercise.id}:${setNumberValue}`),
    ),
  );
  if (!isComplete) throw new Error("Complete every set before finishing the workout.");

  const { error } = await supabase
    .from("workout_sessions")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .is("completed_at", null);

  if (error) throw new Error(error.message);

  redirect(`/history/${sessionId}`);
}
