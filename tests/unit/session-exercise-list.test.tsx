import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { SessionDetail } from "@/lib/workouts/session";
import type { WorkoutDay } from "@/lib/workouts/program";
import { SessionExerciseList } from "@/components/session-exercise-list";

vi.mock("@/components/set-row", () => ({
  SetRow: ({ setNumber }: { setNumber: number }) => <li>Set {setNumber}</li>,
}));

vi.mock("@/components/exercise-motion-preview", () => ({
  ExerciseMotionPreview: () => <div data-testid="motion-preview" />,
}));

vi.mock("@/components/exercise-guide-modal", () => ({
  ExerciseInfoButton: ({ exerciseId, onClick }: { exerciseId: string; onClick: (id: string) => void }) => (
    <button type="button" onClick={() => onClick(exerciseId)}>สอนท่า</button>
  ),
  ExerciseGuideModal: () => null,
}));

vi.mock("@/app/session/[id]/actions", () => ({
  finishSession: vi.fn(),
}));

const workout: WorkoutDay = {
  day: 1,
  weekday: "Monday",
  titleTh: "หลัง + ไบเซป",
  focus: ["Back"],
  exercises: [
    { id: "first", name: "First Exercise", sets: 2, repMin: 8, repMax: 12 },
    { id: "second", name: "Second Exercise", sets: 2, repMin: 10, repMax: 15 },
  ],
};

function makeSession(firstExerciseComplete = false): SessionDetail {
  const completedAt = "2026-08-29T10:00:00.000Z";
  return {
    id: "session-1",
    programDay: 1,
    startedAt: completedAt,
    completedAt: null,
    exercises: [
      {
        id: "workout-exercise-1",
        exerciseId: "first",
        name: "First Exercise",
        position: 1,
        targetSets: 2,
        targetRepMin: 8,
        targetRepMax: 12,
        targetSecondsMin: null,
        targetSecondsMax: null,
        setLogs: firstExerciseComplete
          ? {
              1: { id: "log-1", workoutExerciseId: "workout-exercise-1", setNumber: 1, weightKg: 10, reps: 10, durationSeconds: null, rir: 2, completedAt },
              2: { id: "log-2", workoutExerciseId: "workout-exercise-1", setNumber: 2, weightKg: 10, reps: 10, durationSeconds: null, rir: 2, completedAt },
            }
          : {},
        previousSets: {},
      },
      {
        id: "workout-exercise-2",
        exerciseId: "second",
        name: "Second Exercise",
        position: 2,
        targetSets: 2,
        targetRepMin: 10,
        targetRepMax: 15,
        targetSecondsMin: null,
        targetSecondsMax: null,
        setLogs: {},
        previousSets: {},
      },
    ],
  };
}

afterEach(cleanup);

describe("SessionExerciseList", () => {
  it("shows only the active exercise and moves forward one exercise at a time", () => {
    render(<SessionExerciseList session={makeSession()} workout={workout} />);

    expect(screen.getByRole("heading", { name: "First Exercise" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Second Exercise" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /ท่าถัดไป/i }));

    expect(screen.queryByRole("heading", { name: "First Exercise" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Second Exercise" })).toBeVisible();
    expect(screen.getByText("ท่าที่ 2 จาก 2")).toBeVisible();
  });

  it("resumes at the first exercise that still has incomplete sets", () => {
    render(<SessionExerciseList session={makeSession(true)} workout={workout} />);

    expect(screen.getByRole("heading", { name: "Second Exercise" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "First Exercise" })).not.toBeInTheDocument();
  });
});
