import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SetRow } from "@/components/set-row";

vi.mock("@/app/session/[id]/actions", () => ({
  logSet: vi.fn(),
}));

vi.mock("@/components/rest-timer", () => ({
  useRestTimer: () => ({ start: vi.fn() }),
}));

afterEach(cleanup);

describe("SetRow", () => {
  it("uses the target rep minimum when there is no valid current or previous value", () => {
    render(
      <SetRow
        sessionId="session-1"
        workoutExerciseId="exercise-1"
        setNumber={1}
        isDuration={false}
        isBodyweight={false}
        targetRepMin={8}
        log={undefined}
        previousLog={undefined}
        exerciseName="Dumbbell Curl"
        restSeconds={90}
      />,
    );

    expect(screen.getByDisplayValue("8")).toHaveAttribute("name", "reps");
  });
});
