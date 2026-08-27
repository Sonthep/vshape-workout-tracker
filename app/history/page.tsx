import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listCompletedSessions } from "@/lib/workouts/history";

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

  return (
    <main className="home-shell">
      <Link className="back-link" href="/">← Back to home</Link>
      <header className="home-header">
        <p className="eyebrow">HISTORY</p>
        <h1>Workout history</h1>
      </header>

      {sessions.length === 0 ? (
        <p className="muted">No completed workouts yet. Finish a session to see it here.</p>
      ) : (
        <ol className="history-list">
          {sessions.map((item) => (
            <li key={item.id} className="history-row">
              <Link href={`/history/${item.id}`} className="history-link">
                <div>
                  <span className="history-date">{formatDate(item.completedAt)}</span>
                  <span className="history-title">Day {item.programDay} · {item.weekday} — <span lang="th">{item.titleTh}</span></span>
                </div>
                <span className="history-stats">{item.completedSets}/{item.totalSets} sets · {Math.round(item.totalVolumeKg)} kg</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
