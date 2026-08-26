import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { RestTimerBar, RestTimerProvider, useRestTimer } from "@/components/rest-timer";

function StartButton({ seconds, label }: { seconds: number; label: string }) {
  const { start } = useRestTimer();
  return <button onClick={() => start(seconds, label)}>Complete set</button>;
}

function renderTimer(seconds = 90, label = "Dumbbell Bent-Over Row") {
  return render(
    <RestTimerProvider>
      <StartButton seconds={seconds} label={label} />
      <RestTimerBar />
    </RestTimerProvider>,
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("RestTimerBar", () => {
  it("is hidden until a rest is started", () => {
    renderTimer();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("auto-starts counting down from the exercise-appropriate default after a completed set", async () => {
    vi.useFakeTimers();
    renderTimer();

    await act(async () => {
      screen.getByRole("button", { name: "Complete set" }).click();
    });

    expect(screen.getByText("Rest · Dumbbell Bent-Over Row")).toBeInTheDocument();
    expect(screen.getByText("1:30")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("1:25")).toBeInTheDocument();
  });

  it("pauses and resumes without losing the remaining time", async () => {
    vi.useFakeTimers();
    renderTimer();

    await act(async () => {
      screen.getByRole("button", { name: "Complete set" }).click();
    });
    await act(async () => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("1:20")).toBeInTheDocument();

    await act(async () => {
      screen.getByRole("button", { name: "Pause" }).click();
    });
    await act(async () => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("1:20")).toBeInTheDocument();

    await act(async () => {
      screen.getByRole("button", { name: "Resume" }).click();
    });
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText("1:15")).toBeInTheDocument();
  });

  it("adjusts the remaining time by 15 seconds without blocking the set forms", async () => {
    vi.useFakeTimers();
    renderTimer();

    await act(async () => {
      screen.getByRole("button", { name: "Complete set" }).click();
    });
    await act(async () => {
      screen.getByRole("button", { name: "Add 15 seconds" }).click();
    });
    expect(screen.getByText("1:45")).toBeInTheDocument();

    await act(async () => {
      screen.getByRole("button", { name: "Subtract 15 seconds" }).click();
      screen.getByRole("button", { name: "Subtract 15 seconds" }).click();
    });
    expect(screen.getByText("1:15")).toBeInTheDocument();
  });

  it("shows a completion state and lets the user dismiss it once rest finishes", async () => {
    vi.useFakeTimers();
    renderTimer(2, "Plank");

    await act(async () => {
      screen.getByRole("button", { name: "Complete set" }).click();
    });
    await act(async () => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.getByText("Rest complete")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument();

    await act(async () => {
      screen.getByRole("button", { name: "Dismiss" }).click();
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("skip immediately clears the rest state", async () => {
    vi.useFakeTimers();
    renderTimer();

    await act(async () => {
      screen.getByRole("button", { name: "Complete set" }).click();
    });
    await act(async () => {
      screen.getByRole("button", { name: "Skip" }).click();
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
