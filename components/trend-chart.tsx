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

  // Area path for gradient fill
  const areaPath = points.length > 1 ? `${path} L ${width - 4},${height} L 4,${height} Z` : "";

  return (
    <div className="trend-card">
      <div className="trend-header">
        <span className="trend-label">{label}</span>
        <span className="trend-value">{latest.value} <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>{unit}</span></span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="trend-svg" role="img" aria-label={`${label} trend`}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {areaPath && <path d={areaPath} fill={`url(#grad-${label})`} />}
        <path d={path} fill="none" stroke="var(--accent-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {delta !== null ? (
        <p className="trend-delta" style={{ color: delta < 0 ? "var(--accent-primary)" : "var(--accent-gold)" }}>
          {direction} {Math.abs(delta).toFixed(1)} {unit} since {formatDate(first.date)}
        </p>
      ) : null}
    </div>
  );
}
