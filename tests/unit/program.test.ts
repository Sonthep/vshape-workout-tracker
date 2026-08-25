import { describe, expect, it } from "vitest";
import { formatPrescription, getNextWorkout, program } from "@/lib/workouts/program";

describe("workout program", () => {
  it("contains exactly four training days", () => {
    expect(program).toHaveLength(4);
  });

  it("uses no band, bench, machine, or pull-up exercises", () => {
    const forbidden = /band|bench|machine|pull-?up/i;
    for (const day of program) {
      for (const exercise of day.exercises) {
        expect(exercise.name).not.toMatch(forbidden);
      }
    }
  });

  it("trains direct core twice per week", () => {
    const coreNames = new Set(["Reverse Crunch", "Plank", "Leg Raise", "Dumbbell Crunch"]);
    const coreDays = program.filter((day) => day.exercises.some((e) => coreNames.has(e.name)));
    expect(coreDays).toHaveLength(2);
  });

  it("keeps today's workout available and otherwise finds the next training day", () => {
    expect(getNextWorkout(new Date("2026-08-24T12:00:00"))).toMatchObject({ weekday: "Monday" });
    expect(getNextWorkout(new Date("2026-08-26T12:00:00"))).toMatchObject({ weekday: "Thursday" });
    expect(getNextWorkout(new Date("2026-08-30T12:00:00"))).toMatchObject({ weekday: "Monday" });
  });

  it("formats rep, duration, and per-side prescriptions clearly", () => {
    expect(formatPrescription(program[0].exercises[1])).toBe("3 sets × 10–15 reps / side");
    expect(formatPrescription(program[1].exercises[6])).toBe("2 sets × 30–60 sec");
  });
});
