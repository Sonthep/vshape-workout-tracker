export type MeasurementInput = {
  measuredAt: string;
  weightKg: number | null;
  waistCm: number | null;
  chestCm: number | null;
};

export type TrendPoint = {
  date: string;
  value: number;
};

/**
 * Accepts an ISO yyyy-mm-dd date that is not later than `today` — a body
 * measurement can be backfilled for a past day but never logged in the future.
 */
export function isValidMeasurementDate(value: string, today: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return parsed.getTime() <= todayStart.getTime();
}

export function validateMeasurementInput(input: MeasurementInput, today: Date = new Date()): string | null {
  if (!isValidMeasurementDate(input.measuredAt, today)) {
    return "Enter a valid date that isn't in the future.";
  }
  if (input.weightKg === null && input.waistCm === null && input.chestCm === null) {
    return "Enter at least one measurement.";
  }
  if ([input.weightKg, input.waistCm, input.chestCm].some((value) => value !== null && value <= 0)) {
    return "Measurements must be greater than zero.";
  }
  return null;
}

/**
 * A minimal SVG polyline path, scaled to fit width/height, for a dependency-free
 * trend sparkline. A single point renders as a flat centered line.
 */
export function buildSparklinePath(points: TrendPoint[], width: number, height: number, padding = 4): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const y = height / 2;
    return `M ${padding},${y} L ${width - padding},${y}`;
  }

  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / (points.length - 1);

  return points
    .map((point, index) => {
      const x = padding + index * stepX;
      const normalized = (point.value - min) / range;
      const y = height - padding - normalized * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}
