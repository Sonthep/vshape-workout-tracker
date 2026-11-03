import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SetRow } from "@/components/set-row";

const { logSet, start } = vi.hoisted(() => ({ logSet: vi.fn(), start: vi.fn() }));

vi.mock("@/app/session/[id]/actions", () => ({ logSet }));

vi.mock("@/components/rest-timer", () => ({
  useRestTimer: () => ({ start }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function renderRow(
  overrides: Partial<Parameters<typeof SetRow>[0]> = {},
) {
  return render(
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
      {...overrides}
    />,
  );
}

describe("SetRow", () => {
  it("uses the target rep minimum when there is no valid current or previous value", () => {
    renderRow();

    expect(screen.getByDisplayValue("8")).toHaveAttribute("name", "reps");
  });

  it("shows the error returned by logSet and does not start the rest timer", async () => {
    logSet.mockResolvedValue({ error: "บันทึกเซตไม่สำเร็จ" });
    const onCompleted = vi.fn();
    renderRow({ onCompleted });

    fireEvent.click(screen.getByRole("button", { name: "บันทึกเซต" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("บันทึกเซตไม่สำเร็จ");
    expect(onCompleted).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
  });

  it("shows a neutral error when logSet throws", async () => {
    logSet.mockRejectedValue(new Error("network"));
    renderRow();

    fireEvent.click(screen.getByRole("button", { name: "บันทึกเซต" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("อาจถูกบันทึกแล้ว");
    expect(start).not.toHaveBeenCalled();
  });

  it("starts the rest timer only when logSet asks for it", async () => {
    logSet.mockResolvedValueOnce({ error: null, shouldStartRest: true });
    const onCompleted = vi.fn();
    renderRow({ onCompleted });

    fireEvent.click(screen.getByRole("button", { name: "บันทึกเซต" }));
    await waitFor(() => expect(start).toHaveBeenCalledWith(90, "Dumbbell Curl"));
    expect(onCompleted).toHaveBeenCalledTimes(1);

    logSet.mockResolvedValueOnce({ error: null, shouldStartRest: false });
    fireEvent.click(screen.getByRole("button", { name: "บันทึกเซต" }));
    await waitFor(() => expect(onCompleted).toHaveBeenCalledTimes(2));
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("keeps a saved reps value of 0 instead of replacing it with a suggestion", () => {
    const log = { reps: 0, completedAt: "2026-01-01T00:00:00Z" } as never;
    renderRow({ log });

    expect(document.querySelector<HTMLInputElement>('input[name="reps"]')?.value).toBe("0");
  });

  it("prefills duration from the target when there is no saved or previous value", () => {
    renderRow({ isDuration: true, targetSecondsMin: 30 });

    expect(document.querySelector<HTMLInputElement>('input[name="durationSeconds"]')?.value).toBe("30");
  });

  it("clears a stale error when a field is edited", async () => {
    logSet.mockResolvedValue({ error: "บันทึกเซตไม่สำเร็จ" });
    renderRow();

    fireEvent.click(screen.getByRole("button", { name: "บันทึกเซต" }));
    await screen.findByRole("alert");
    fireEvent.click(screen.getByRole("button", { name: "Increase reps" }));

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("does not let the reps stepper go below 1", () => {
    renderRow();

    const decrease = screen.getByRole("button", { name: "Decrease reps" });
    for (let i = 0; i < 10; i++) fireEvent.click(decrease);

    const repsInput = document.querySelector<HTMLInputElement>('input[name="reps"]');
    expect(repsInput?.value).toBe("1");
  });
});
