import { describe, expect, it } from "vitest";
import { isoDateInTimeZone, weekdayInTimeZone } from "@/lib/date";

describe("Bangkok calendar helpers", () => {
  it("uses the Bangkok date instead of UTC around midnight", () => {
    const instant = new Date("2026-10-29T18:30:00.000Z");
    expect(isoDateInTimeZone(instant)).toBe("2026-10-30");
    expect(weekdayInTimeZone(instant)).toBe(5);
  });
});
