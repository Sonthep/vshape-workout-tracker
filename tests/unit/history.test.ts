import { describe, expect, it } from "vitest";
import type { SetLog } from "@/lib/domain/types";
import type { SessionExerciseView } from "@/lib/workouts/session";
import { calculateVolumeKg, formatVolumeDelta, summarizeSession } from "@/lib/workouts/history";

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

function makeExercise(overrides: Partial<SessionExerciseView>): SessionExerciseView {
  return {
    id: "we-1",
    exerciseId: "db-curl",
    name: "Dumbbell Curl",
    position: 1,
    targetSets: 2,
    targetRepMin: 10,
    targetRepMax: 15,
    targetSecondsMin: null,
    targetSecondsMax: null,
    setLogs: {},
    previousSets: {},
    ...overrides,
  };
}

describe("calculateVolumeKg", () => {
  it("sums weight times reps across sets", () => {
    const volume = calculateVolumeKg([
      { weightKg: 10, reps: 10 },
      { weightKg: 12, reps: 8 },
    ]);
    expect(volume).toBe(196);
  });

  it("skips sets missing weight or reps", () => {
    const volume = calculateVolumeKg([
      { weightKg: null, reps: 10 },
      { weightKg: 10, reps: null },
      { weightKg: 10, reps: 10 },
    ]);
    expect(volume).toBe(100);
  });
});

describe("summarizeSession", () => {
  it("counts completed sets against total prescribed sets", () => {
    const exercises = [
      makeExercise({
        targetSets: 2,
        setLogs: {
          1: makeSetLog({ setNumber: 1, weightKg: 10, reps: 10, completedAt: "2026-01-01T00:00:00Z" }),
        },
      }),
    ];
    const summary = summarizeSession(exercises);
    expect(summary.totalSets).toBe(2);
    expect(summary.completedSets).toBe(1);
  });

  it("computes total volume from this session's completed sets", () => {
    const exercises = [
      makeExercise({
        setLogs: {
          1: makeSetLog({ weightKg: 10, reps: 10, completedAt: "2026-01-01T00:00:00Z" }),
          2: makeSetLog({ setNumber: 2, weightKg: 10, reps: 8, completedAt: "2026-01-01T00:00:00Z" }),
        },
      }),
    ];
    expect(summarizeSession(exercises).totalVolumeKg).toBe(180);
  });

  it("returns null previous volume when there is no previous session data", () => {
    const exercises = [makeExercise({})];
    expect(summarizeSession(exercises).previousVolumeKg).toBeNull();
  });

  it("computes previous volume when previous session data exists", () => {
    const exercises = [
      makeExercise({
        previousSets: {
          1: makeSetLog({ weightKg: 8, reps: 10, completedAt: "2025-12-01T00:00:00Z" }),
        },
      }),
    ];
    expect(summarizeSession(exercises).previousVolumeKg).toBe(80);
  });

  it("sums duration seconds separately from volume", () => {
    const exercises = [
      makeExercise({
        targetSecondsMin: 30,
        targetSecondsMax: 60,
        setLogs: {
          1: makeSetLog({ durationSeconds: 45, completedAt: "2026-01-01T00:00:00Z" }),
        },
      }),
    ];
    const summary = summarizeSession(exercises);
    expect(summary.totalDurationSeconds).toBe(45);
    expect(summary.totalVolumeKg).toBe(0);
  });
});

describe("formatVolumeDelta", () => {
  it("returns null when there is no previous volume to compare", () => {
    expect(formatVolumeDelta(100, null)).toBeNull();
    expect(formatVolumeDelta(100, 0)).toBeNull();
  });

  it("reports an increase", () => {
    expect(formatVolumeDelta(110, 100)).toBe("▲ 10% vs last time");
  });

  it("reports a decrease", () => {
    expect(formatVolumeDelta(90, 100)).toBe("▼ 10% vs last time");
  });

  it("reports no change", () => {
    expect(formatVolumeDelta(100, 100)).toBe("Same total volume as last time");
  });
});
