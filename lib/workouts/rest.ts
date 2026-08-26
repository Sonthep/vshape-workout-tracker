export type RestExercise = {
  targetSecondsMin: number | null;
  targetRepMax: number | null;
};

/**
 * Exercise-appropriate default rest: short after a timed core hold, longer
 * after lower-rep compound lifts (more neuromuscular fatigue per set), and a
 * moderate default for higher-rep accessory work.
 */
export function getDefaultRestSeconds(exercise: RestExercise): number {
  if (exercise.targetSecondsMin !== null) return 45;
  if (exercise.targetRepMax !== null && exercise.targetRepMax <= 12) return 90;
  return 60;
}
