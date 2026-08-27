import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listCompletedSessions } from "@/lib/workouts/history";
import { ChevronRightIcon, DumbbellIcon, HistoryIcon, TrophyIcon } from "@/components/icons";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sessions = await listCompletedSessions(supabase, user.id);
  const totalCompleted = sessions.length;
  const totalVolume = sessions.reduce((sum, s) => sum + s.totalVolumeKg, 0);

  return (
    <main className="home-shell">
      <Link className="back-link" href="/">← Back to home</Link>
      <header className="home-header">
        <span className="eyebrow">HISTORY</span>
        <h1 style={{ margin: "4px 0 8px" }}>Workout history</h1>
        <p className="muted">Track your completed sessions and volume progression over time.</p>
      </header>

      {/* Summary Stat Cards */}
      {sessions.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="trend-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent-primary)" }}>
              <TrophyIcon className="w-4 h-4" />
              <span className="trend-label">Workouts</span>
            </div>
            <div className="trend-value">{totalCompleted}</div>
          </div>
          <div className="trend-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent-blue)" }}>
              <DumbbellIcon className="w-4 h-4" />
              <span className="trend-label">Total Volume</span>
            </div>
            <div className="trend-value">{Math.round(totalVolume)} <span style={{ fontSize: "1rem" }}>kg</span></div>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="next-workout" style={{ textAlign: "center", padding: "40px 20px" }}>
          <div className="feature-icon-wrap" style={{ margin: "0 auto 16px", width: 50, height: 50 }}>
            <HistoryIcon className="w-6 h-6" />
          </div>
          <h2 style={{ margin: "0 0 6px" }}>No completed workouts yet</h2>
          <p className="muted">Finish your first session to see your progress metrics here.</p>
        </div>
      ) : (
        <ol className="history-list">
          {sessions.map((item) => (
            <li key={item.id} className="history-row">
              <Link href={`/history/${item.id}`} className="history-link">
                <div>
                  <span className="history-date">{formatDate(item.completedAt)}</span>
                  <span className="history-title">Day {item.programDay} · {item.weekday} — <span lang="th">{item.titleTh}</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="history-stats">{item.completedSets}/{item.totalSets} sets · {Math.round(item.totalVolumeKg)} kg</span>
                  <ChevronRightIcon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
