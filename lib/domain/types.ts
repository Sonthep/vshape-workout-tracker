export type SetLog = {
  id: string;
  workoutExerciseId: string;
  setNumber: number;
  weightKg: number | null;
  reps: number | null;
  durationSeconds: number | null;
  rir: number | null;
  completedAt: string | null;
};

export type BodyMeasurement = {
  measuredAt: string;
  weightKg: number | null;
  waistCm: number | null;
  chestCm: number | null;
};
