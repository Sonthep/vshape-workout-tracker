import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MeasurementForm } from "@/components/measurement-form";
import { TrendChart } from "@/components/trend-chart";
import type { BodyMeasurement } from "@/lib/domain/types";
import type { TrendPoint } from "@/lib/progress/measurements";
import { isoDateInTimeZone } from "@/lib/date";


function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function todayIso(): string {
  return isoDateInTimeZone();
}

function toTrendPoints(measurements: BodyMeasurement[], pick: (m: BodyMeasurement) => number | null): TrendPoint[] {
  return measurements
    .filter((m) => pick(m) !== null)
    .map((m) => ({ date: m.measuredAt, value: pick(m) as number }));
}

type MeasurementRow = {
  measured_at: string;
  weight_kg: number | null;
  waist_cm: number | null;
  chest_cm: number | null;
};

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("body_measurements")
    .select("measured_at, weight_kg, waist_cm, chest_cm")
    .eq("user_id", user.id)
    .order("measured_at", { ascending: true });

  if (error) throw new Error(error.message);

  const measurements: BodyMeasurement[] = ((data ?? []) as MeasurementRow[]).map((row) => ({
    measuredAt: row.measured_at,
    weightKg: row.weight_kg,
    waistCm: row.waist_cm,
    chestCm: row.chest_cm,
  }));

  const recent = [...measurements].reverse();

  return (
    <main className="home-shell">
      <Link className="back-link" href="/">← Back to home</Link>
      <header className="home-header">
        <span className="eyebrow">PROGRESS</span>
        <h1 style={{ margin: "4px 0 8px" }}>Body measurements</h1>
        <p className="muted">Track your shoulder-to-waist taper, chest size, and bodyweight.</p>
      </header>

      <MeasurementForm today={todayIso()} />

      {measurements.length > 0 ? (
        <section className="trend-grid" aria-label="Trends">
          <TrendChart label="Weight" unit="kg" points={toTrendPoints(measurements, (m) => m.weightKg)} />
          <TrendChart label="Waist" unit="cm" points={toTrendPoints(measurements, (m) => m.waistCm)} />
          <TrendChart label="Chest" unit="cm" points={toTrendPoints(measurements, (m) => m.chestCm)} />
        </section>
      ) : null}

      {recent.length > 0 ? (
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>LOGGED ENTRIES</span>
          <ol className="measurement-list">
            {recent.map((entry) => (
              <li key={entry.measuredAt} className="measurement-row">
                <span className="history-date">{formatDate(entry.measuredAt)}</span>
                <span className="measurement-values">
                  {entry.weightKg !== null ? `${entry.weightKg} kg` : "—"}
                  {" · "}
                  {entry.waistCm !== null ? `${entry.waistCm} cm waist` : "—"}
                  {" · "}
                  {entry.chestCm !== null ? `${entry.chestCm} cm chest` : "—"}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <div className="next-workout" style={{ textAlign: "center", padding: "30px 20px" }}>
          <p className="muted">No measurements logged yet. Use the form above to record your baseline stats.</p>
        </div>
      )}
    </main>
  );
}
