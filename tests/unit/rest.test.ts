import { describe, expect, it } from "vitest";
import { getDefaultRestSeconds } from "@/lib/workouts/rest";

describe("getDefaultRestSeconds", () => {
  it("gives a short rest after a timed core hold", () => {
    expect(getDefaultRestSeconds({ targetSecondsMin: 30, targetRepMax: null })).toBe(45);
  });

  it("gives a long rest after lower-rep compound work", () => {
    expect(getDefaultRestSeconds({ targetSecondsMin: null, targetRepMax: 12 })).toBe(90);
  });

  it("gives a moderate rest after higher-rep accessory work", () => {
    expect(getDefaultRestSeconds({ targetSecondsMin: null, targetRepMax: 20 })).toBe(60);
  });

  it("gives a moderate rest when no rep range is set", () => {
    expect(getDefaultRestSeconds({ targetSecondsMin: null, targetRepMax: null })).toBe(60);
  });
});
