"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parseNullableNumber } from "@/lib/workouts/session";

export async function logSet(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sessionId = String(formData.get("sessionId"));
  const workoutExerciseId = String(formData.get("workoutExerciseId"));
  const setNumber = Number(formData.get("setNumber"));

  const { error } = await supabase.from("set_logs").upsert(
    {
      workout_exercise_id: workoutExerciseId,
      set_number: setNumber,
      weight_kg: parseNullableNumber(formData.get("weightKg")),
      reps: parseNullableNumber(formData.get("reps")),
      duration_seconds: parseNullableNumber(formData.get("durationSeconds")),
      rir: parseNullableNumber(formData.get("rir")),
      completed_at: new Date().toISOString(),
    },
    { onConflict: "workout_exercise_id,set_number" },
  );

  if (error) throw new Error(error.message);

  revalidatePath(`/session/${sessionId}`);
}
