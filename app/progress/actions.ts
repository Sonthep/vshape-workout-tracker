"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { validateMeasurementInput } from "@/lib/progress/measurements";
import { parseNullableNumber } from "@/lib/workouts/session";

export type LogMeasurementState = { error: string | null };

export async function logMeasurement(
  _prevState: LogMeasurementState,
  formData: FormData,
): Promise<LogMeasurementState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const input = {
    measuredAt: String(formData.get("measuredAt")),
    weightKg: parseNullableNumber(formData.get("weightKg")),
    waistCm: parseNullableNumber(formData.get("waistCm")),
    chestCm: parseNullableNumber(formData.get("chestCm")),
  };

  const validationError = validateMeasurementInput(input);
  if (validationError) return { error: validationError };

  const { error } = await supabase.from("body_measurements").upsert(
    {
      user_id: user.id,
      measured_at: input.measuredAt,
      weight_kg: input.weightKg,
      waist_cm: input.waistCm,
      chest_cm: input.chestCm,
    },
    { onConflict: "user_id,measured_at" },
  );

  if (error) return { error: error.message };

  revalidatePath("/progress");
  return { error: null };
}
