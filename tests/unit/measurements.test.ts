import { describe, expect, it } from "vitest";
import {
  buildSparklinePath,
  isValidMeasurementDate,
  validateMeasurementInput,
  type MeasurementInput,
} from "@/lib/progress/measurements";

const today = new Date("2026-08-26T12:00:00");

function makeInput(overrides: Partial<MeasurementInput>): MeasurementInput {
  return { measuredAt: "2026-08-26", weightKg: 80, waistCm: null, chestCm: null, ...overrides };
}

describe("isValidMeasurementDate", () => {
  it("accepts today and past dates", () => {
    expect(isValidMeasurementDate("2026-08-26", today)).toBe(true);
    expect(isValidMeasurementDate("2026-01-01", today)).toBe(true);
  });

  it("rejects a future date", () => {
    expect(isValidMeasurementDate("2026-08-27", today)).toBe(false);
  });

  it("rejects malformed or invalid dates", () => {
    expect(isValidMeasurementDate("", today)).toBe(false);
    expect(isValidMeasurementDate("not-a-date", today)).toBe(false);
    expect(isValidMeasurementDate("2026-13-40", today)).toBe(false);
    expect(isValidMeasurementDate("2026-02-31", today)).toBe(false);
  });
});

describe("validateMeasurementInput", () => {
  it("accepts a valid partial measurement", () => {
    expect(validateMeasurementInput(makeInput({}), today)).toBeNull();
  });

  it("rejects a future date", () => {
    expect(validateMeasurementInput(makeInput({ measuredAt: "2026-08-27" }), today)).not.toBeNull();
  });

  it("rejects when every measurement is empty", () => {
    const error = validateMeasurementInput(makeInput({ weightKg: null }), today);
    expect(error).toBe("Enter at least one measurement.");
  });

  it("rejects a non-positive value", () => {
    const error = validateMeasurementInput(makeInput({ weightKg: 0 }), today);
    expect(error).toBe("Measurements must be greater than zero.");
  });
});

describe("buildSparklinePath", () => {
  it("returns an empty path with no points", () => {
    expect(buildSparklinePath([], 100, 50)).toBe("");
  });

  it("draws a centered flat line for a single point", () => {
    const path = buildSparklinePath([{ date: "2026-08-01", value: 80 }], 100, 50, 4);
    expect(path).toBe("M 4,25 L 96,25");
  });

  it("maps an increasing trend to a decreasing y (up on screen)", () => {
    const path = buildSparklinePath(
      [
        { date: "2026-08-01", value: 80 },
        { date: "2026-08-08", value: 82 },
      ],
      100,
      50,
      4,
    );
    const [, firstY] = path.split(" ")[1].split(",").map(Number);
    const [, secondY] = path.split(" ")[3].split(",").map(Number);
    expect(secondY).toBeLessThan(firstY);
  });

  it("draws a flat line when all values are equal", () => {
    const path = buildSparklinePath(
      [
        { date: "2026-08-01", value: 80 },
        { date: "2026-08-08", value: 80 },
      ],
      100,
      50,
      4,
    );
    const firstY = Number(path.split(" ")[1].split(",")[1]);
    const secondY = Number(path.split(" ")[3].split(",")[1]);
    expect(firstY).toBe(secondY);
  });
});
