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

  it("keeps beginner-friendly session volume and prioritizes V-shape muscles", () => {
    expect(program.every((day) => day.exercises.length <= 7)).toBe(true);
    expect(program[0].exercises.map((exercise) => exercise.id)).toContain("lateral-raise");
    expect(program[2].exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining([
      "one-arm-lat-row",
      "lateral-raise",
      "rear-delt-fly",
    ]));
  });

  it("keeps today's workout available and otherwise finds the next training day", () => {
    expect(getNextWorkout(new Date("2026-08-24T12:00:00"))).toMatchObject({ weekday: "Monday" });
    expect(getNextWorkout(new Date("2026-08-26T12:00:00"))).toMatchObject({ weekday: "Thursday" });
    expect(getNextWorkout(new Date("2026-08-30T12:00:00"))).toMatchObject({ weekday: "Monday" });
  });

  it("formats rep, duration, and per-side prescriptions clearly", () => {
    expect(formatPrescription(program[0].exercises[0])).toBe("3 sets × 8–12 reps / side");
    expect(formatPrescription(program[1].exercises[5])).toBe("2 sets × 30–60 sec");
  });
});
