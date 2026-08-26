import { buildSparklinePath, type TrendPoint } from "@/lib/progress/measurements";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function TrendChart({ label, unit, points }: { label: string; unit: string; points: TrendPoint[] }) {
  if (points.length === 0) return null;

  const width = 280;
  const height = 72;
  const path = buildSparklinePath(points, width, height);
  const latest = points[points.length - 1];
  const first = points[0];
  const delta = points.length > 1 ? latest.value - first.value : null;
  const direction = delta === null || delta === 0 ? "–" : delta > 0 ? "▲" : "▼";

  return (
    <div className="trend-card">
      <div className="trend-header">
        <span className="trend-label">{label}</span>
        <span className="trend-value">{latest.value} {unit}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="trend-svg" role="img" aria-label={`${label} trend`}>
        <path d={path} fill="none" stroke="currentColor" strokeWidth={2} />
      </svg>
      {delta !== null ? (
        <p className="trend-delta">{direction} {Math.abs(delta).toFixed(1)} {unit} since {formatDate(first.date)}</p>
      ) : null}
    </div>
  );
}
