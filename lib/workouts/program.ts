export type ExercisePrescription = {
  id: string;
  name: string;
  sets: number;
  repMin?: number;
  repMax?: number;
  secondsMin?: number;
  secondsMax?: number;
  perSide?: boolean;
  priority?: boolean;
};

export type WorkoutDay = {
  day: 1 | 2 | 3 | 4;
  weekday: "Monday" | "Tuesday" | "Thursday" | "Saturday";
  titleTh: string;
  focus: string[];
  exercises: ExercisePrescription[];
};

const scheduledWeekdays: Record<WorkoutDay["weekday"], number> = {
  Monday: 1,
  Tuesday: 2,
  Thursday: 4,
  Saturday: 6,
};

/**
 * Returns the next scheduled workout. A workout remains available throughout
 * its scheduled calendar day, which prevents a Monday workout from being
 * skipped just because it is already afternoon.
 */
export function getNextWorkout(date: Date, workouts: WorkoutDay[] = program): WorkoutDay {
  if (workouts.length === 0) {
    throw new Error("A workout program must contain at least one workout day.");
  }

  const currentWeekday = date.getDay();
  return workouts.reduce((closest, workout) => {
    const closestDistance = (scheduledWeekdays[closest.weekday] - currentWeekday + 7) % 7;
    const candidateDistance = (scheduledWeekdays[workout.weekday] - currentWeekday + 7) % 7;
    return candidateDistance < closestDistance ? workout : closest;
  });
}

export function getNextWorkoutForWeekday(currentWeekday: number, workouts: WorkoutDay[] = program): WorkoutDay {
  if (workouts.length === 0) throw new Error("A workout program must contain at least one workout day.");
  return workouts.reduce((closest, workout) => {
    const closestDistance = (scheduledWeekdays[closest.weekday] - currentWeekday + 7) % 7;
    const candidateDistance = (scheduledWeekdays[workout.weekday] - currentWeekday + 7) % 7;
    return candidateDistance < closestDistance ? workout : closest;
  });
}

export function formatPrescription(exercise: ExercisePrescription): string {
  const range = exercise.secondsMin !== undefined && exercise.secondsMax !== undefined
    ? `${exercise.secondsMin}\u2013${exercise.secondsMax} sec`
    : `${exercise.repMin}\u2013${exercise.repMax} reps`;
  return `${exercise.sets} sets \u00d7 ${range}${exercise.perSide ? " / side" : ""}`;
}

export const program: WorkoutDay[] = [
  {
    day: 1,
    weekday: "Monday",
    titleTh: "หลัง + ไหล่ข้าง + ไบเซป",
    focus: ["Lats", "Mid back", "Side delts", "Biceps"],
    exercises: [
      { id: "one-arm-lat-row", name: "One-Arm Dumbbell Lat Row", sets: 3, repMin: 8, repMax: 12, perSide: true, priority: true },
      { id: "db-bent-over-row", name: "Dumbbell Bent-Over Row", sets: 2, repMin: 8, repMax: 12 },
      { id: "floor-pullover", name: "Dumbbell Floor Pullover", sets: 2, repMin: 10, repMax: 15 },
      { id: "lateral-raise", name: "Dumbbell Lateral Raise", sets: 3, repMin: 12, repMax: 20, priority: true },
      { id: "db-curl", name: "Dumbbell Curl", sets: 2, repMin: 10, repMax: 15 }
    ]
  },
  {
    day: 2,
    weekday: "Tuesday",
    titleTh: "ขา + อก + ท้อง",
    focus: ["Legs", "Glutes", "Chest", "Core"],
    exercises: [
      { id: "goblet-squat", name: "Goblet Squat", sets: 3, repMin: 8, repMax: 12 },
      { id: "db-rdl", name: "Dumbbell Romanian Deadlift", sets: 3, repMin: 8, repMax: 12 },
      { id: "floor-press", name: "Dumbbell Floor Press", sets: 3, repMin: 8, repMax: 12 },
      { id: "push-up", name: "Push-Up", sets: 2, repMin: 8, repMax: 15 },
      { id: "reverse-crunch", name: "Reverse Crunch", sets: 2, repMin: 12, repMax: 20 },
      { id: "plank", name: "Plank", sets: 2, secondsMin: 30, secondsMax: 60 }
    ]
  },
  {
    day: 3,
    weekday: "Thursday",
    titleTh: "ปีก + ไหล่ + ไตรเซป (เน้น V-Shape)",
    focus: ["Lats", "Side delts", "Rear delts", "Triceps"],
    exercises: [
      { id: "one-arm-lat-row", name: "One-Arm Dumbbell Lat Row", sets: 3, repMin: 10, repMax: 15, perSide: true, priority: true },
      { id: "standing-shoulder-press", name: "Standing Dumbbell Shoulder Press", sets: 3, repMin: 8, repMax: 12 },
      { id: "lateral-raise", name: "Dumbbell Lateral Raise", sets: 3, repMin: 12, repMax: 20, priority: true },
      { id: "rear-delt-fly", name: "Bent-Over Rear Delt Fly", sets: 2, repMin: 12, repMax: 20 },
      { id: "floor-pullover", name: "Dumbbell Floor Pullover", sets: 2, repMin: 10, repMax: 15, priority: true },
      { id: "overhead-triceps-extension", name: "Overhead Dumbbell Triceps Extension", sets: 2, repMin: 10, repMax: 15 }
    ]
  },
  {
    day: 4,
    weekday: "Saturday",
    titleTh: "ขา + อก + หลังเสริม + ท้อง",
    focus: ["Legs", "Chest", "Rear delts", "Core"],
    exercises: [
      { id: "reverse-lunge", name: "Dumbbell Reverse Lunge", sets: 3, repMin: 8, repMax: 12, perSide: true },
      { id: "db-rdl", name: "Dumbbell Romanian Deadlift", sets: 2, repMin: 10, repMax: 15 },
      { id: "floor-press", name: "Dumbbell Floor Press", sets: 3, repMin: 10, repMax: 15 },
      { id: "rear-delt-row", name: "Dumbbell Rear-Delt Row", sets: 2, repMin: 10, repMax: 15 },
      { id: "lateral-raise", name: "Dumbbell Lateral Raise", sets: 2, repMin: 15, repMax: 20, priority: true },
      { id: "plank", name: "Plank", sets: 2, secondsMin: 30, secondsMax: 60 },
      { id: "db-crunch", name: "Dumbbell Crunch", sets: 2, repMin: 10, repMax: 15 }
    ]
  }
];
