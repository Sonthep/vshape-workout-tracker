import { describe, expect, it } from "vitest";
import { program } from "@/lib/workouts/program";
import { getExerciseGuide } from "@/lib/workouts/exercise-guides";

describe("exercise-guides", () => {
  it("provides complete guide for every exercise in the 4-day program", () => {
    for (const day of program) {
      for (const exercise of day.exercises) {
        const guide = getExerciseGuide(exercise.id);
        expect(guide, `Guide should exist for ${exercise.id}`).toBeDefined();
        expect(guide?.name).toBeTruthy();
        expect(guide?.nameTh).toBeTruthy();
        expect(guide?.category).toBeTruthy();
        expect(guide?.categoryTh).toBeTruthy();
        expect(guide?.primaryMuscles.length).toBeGreaterThan(0);
        expect(guide?.primaryMusclesTh.length).toBeGreaterThan(0);
        expect(guide?.setup.length).toBeGreaterThan(0);
        expect(guide?.execution.length).toBeGreaterThan(0);
        expect(guide?.breathing).toBeTruthy();
        expect(guide?.proTips.length).toBeGreaterThan(0);
        expect(guide?.commonMistakes.length).toBeGreaterThan(0);
        expect(guide?.imageUrl).toBeTruthy();
        expect(guide?.diagramUrl).toBeTruthy();
        expect(guide?.vShapeImpact).toBeTruthy();
      }
    }
  });

  it("returns undefined for unknown exercise ID", () => {
    expect(getExerciseGuide("unknown-exercise-id")).toBeUndefined();
  });
});
