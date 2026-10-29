import { describe, expect, it } from "vitest";
import type { SetLog } from "@/lib/domain/types";
import {
  formatPreviousSetHint,
  formatSetValue,
  indexPreviousSetLogsByExercise,
  indexSetLogsByWorkoutExercise,
  isDurationExercise,
  isBodyweightExercise,
  parseNullableNumber,
  validateSetInput,
} from "@/lib/workouts/session";

function makeSetLog(overrides: Partial<SetLog>): SetLog {
  return {
    id: "log-1",
    workoutExerciseId: "we-1",
    setNumber: 1,
    weightKg: null,
    reps: null,
    durationSeconds: null,
    rir: null,
    completedAt: null,
    ...overrides,
  };
}

describe("isDurationExercise", () => {
  it("treats an exercise with a target duration as duration-based", () => {
    expect(isDurationExercise({ targetSecondsMin: 30 })).toBe(true);
  });

  it("treats an exercise without a target duration as rep-based", () => {
    expect(isDurationExercise({ targetSecondsMin: null })).toBe(false);
  });
});

describe("isBodyweightExercise", () => {
  it("distinguishes bodyweight movements from loaded dumbbell movements", () => {
    expect(isBodyweightExercise("push-up")).toBe(true);
    expect(isBodyweightExercise("reverse-crunch")).toBe(true);
    expect(isBodyweightExercise("floor-press")).toBe(false);
  });
});

describe("parseNullableNumber", () => {
  it("returns null for missing or blank values", () => {
    expect(parseNullableNumber(null)).toBeNull();
    expect(parseNullableNumber("")).toBeNull();
    expect(parseNullableNumber("   ")).toBeNull();
  });

  it("parses numeric strings", () => {
    expect(parseNullableNumber("12.5")).toBe(12.5);
    expect(parseNullableNumber("0")).toBe(0);
  });

  it("returns null for non-numeric input", () => {
    expect(parseNullableNumber("not-a-number")).toBeNull();
  });
});

describe("indexSetLogsByWorkoutExercise", () => {
  it("groups logs by their own workout_exercise id and set number", () => {
    const logs = [
      makeSetLog({ workoutExerciseId: "we-1", setNumber: 1, reps: 10 }),
      makeSetLog({ workoutExerciseId: "we-1", setNumber: 2, reps: 8 }),
      makeSetLog({ workoutExerciseId: "we-2", setNumber: 1, reps: 12 }),
    ];

    const grouped = indexSetLogsByWorkoutExercise(logs);

    expect(grouped.get("we-1")?.[1]?.reps).toBe(10);
    expect(grouped.get("we-1")?.[2]?.reps).toBe(8);
    expect(grouped.get("we-2")?.[1]?.reps).toBe(12);
  });
});

describe("indexPreviousSetLogsByExercise", () => {
  it("matches a previous session's logs to the current exercise catalog id", () => {
    const previousExercises = [
      { id: "prev-we-1", exerciseId: "db-curl" },
      { id: "prev-we-2", exerciseId: "hammer-curl" },
    ];
    const previousLogs = [
      makeSetLog({ workoutExerciseId: "prev-we-1", setNumber: 1, weightKg: 12, reps: 10 }),
      makeSetLog({ workoutExerciseId: "prev-we-2", setNumber: 1, weightKg: 8, reps: 12 }),
    ];

    const grouped = indexPreviousSetLogsByExercise(previousExercises, previousLogs);

    expect(grouped.get("db-curl")?.[1]?.weightKg).toBe(12);
    expect(grouped.get("hammer-curl")?.[1]?.weightKg).toBe(8);
  });

  it("ignores logs whose workout_exercise id is not in the given exercise list", () => {
    const grouped = indexPreviousSetLogsByExercise(
      [{ id: "prev-we-1", exerciseId: "db-curl" }],
      [makeSetLog({ workoutExerciseId: "unknown-we", setNumber: 1 })],
    );

    expect(grouped.size).toBe(0);
  });
});

describe("formatPreviousSetHint", () => {
  it("returns null when there is no previous log", () => {
    expect(formatPreviousSetHint(undefined, false)).toBeNull();
  });

  it("formats a rep-based hint with weight, reps, and RIR", () => {
    const log = makeSetLog({ weightKg: 20, reps: 10, rir: 2 });
    expect(formatPreviousSetHint(log, false)).toBe("20 kg × 10 reps (RIR 2)");
  });

  it("formats a duration-based hint", () => {
    const log = makeSetLog({ durationSeconds: 45 });
    expect(formatPreviousSetHint(log, true)).toBe("45 sec");
  });

  it("omits external weight for a bodyweight movement", () => {
    const log = makeSetLog({ weightKg: 10, reps: 12, rir: 2 });
    expect(formatPreviousSetHint(log, false, false)).toBe("12 reps (RIR 2)");
  });

  it("returns null when a duration hint has no recorded duration", () => {
    const log = makeSetLog({ durationSeconds: null });
    expect(formatPreviousSetHint(log, true)).toBeNull();
  });
});

describe("formatSetValue", () => {
  it("shows a placeholder when the set was never logged", () => {
    expect(formatSetValue(undefined, false)).toBe("—");
  });

  it("shows a placeholder when the set was logged but not completed", () => {
    const log = makeSetLog({ weightKg: 10, reps: 10, completedAt: null });
    expect(formatSetValue(log, false)).toBe("—");
  });

  it("formats a completed rep-based set with RIR", () => {
    const log = makeSetLog({ weightKg: 20, reps: 10, rir: 2, completedAt: "2026-01-01T00:00:00Z" });
    expect(formatSetValue(log, false)).toBe("20 kg × 10 reps (RIR 2)");
  });

  it("formats a completed duration-based set", () => {
    const log = makeSetLog({ durationSeconds: 45, completedAt: "2026-01-01T00:00:00Z" });
    expect(formatSetValue(log, true)).toBe("45 sec");
  });
});

describe("validateSetInput", () => {
  const validRepSet = { setNumber: 1, weightKg: 10, reps: 10, durationSeconds: null, rir: 2 };

  it("accepts a valid rep set", () => {
    expect(validateSetInput(validRepSet, { targetSets: 3, isDuration: false })).toBeNull();
  });

  it("rejects out-of-range sets and invalid reps", () => {
    expect(validateSetInput({ ...validRepSet, setNumber: 4 }, { targetSets: 3, isDuration: false })).toBe("Invalid set number.");
    expect(validateSetInput({ ...validRepSet, reps: -1 }, { targetSets: 3, isDuration: false })).toBe("Reps must be a positive whole number.");
  });

  it("requires a positive whole duration for timed exercises", () => {
    expect(validateSetInput({ ...validRepSet, durationSeconds: 30 }, { targetSets: 3, isDuration: true })).toBeNull();
    expect(validateSetInput({ ...validRepSet, durationSeconds: 0 }, { targetSets: 3, isDuration: true })).toBe("Duration must be a positive whole number.");
  });
});
