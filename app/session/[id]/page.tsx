import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { program } from "@/lib/workouts/program";
import { createClient } from "@/lib/supabase/server";
import { getSessionDetail } from "@/lib/workouts/session";
import { RestTimerBar, RestTimerProvider } from "@/components/rest-timer";
import { DumbbellIcon } from "@/components/icons";
import { SessionExerciseList } from "@/components/session-exercise-list";

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const session = await getSessionDetail(supabase, id, user.id);
  if (!session) notFound();

  const workout = program.find((item) => item.day === session.programDay);
  if (!workout) notFound();

  // Calculate completed sets progress
  const totalSetsCount = session.exercises.reduce((acc, e) => acc + e.targetSets, 0);
  const completedSetsCount = session.exercises.reduce(
    (acc, e) => acc + Object.values(e.setLogs).filter((s) => s?.completedAt != null).length,
    0
  );
  const progressPercent = totalSetsCount > 0 ? Math.round((completedSetsCount / totalSetsCount) * 100) : 0;

  return (
    <RestTimerProvider>
      <main className="home-shell session-shell">
        <Link className="back-link" href={`/workout/${session.programDay}`}>← Back to workout plan</Link>
        <header className="home-header workout-header">
          <div className="workout-day-pill">
            <DumbbellIcon className="w-3.5 h-3.5" />
            <span>DAY {session.programDay} · {workout.weekday}</span>
          </div>
          <h1 lang="th" style={{ margin: "10px 0 6px" }}>{workout.titleTh}</h1>
          <p className="muted">Log each set as you finish it. Tap &quot;สอนท่า&quot; anytime to review form cues.</p>

          {/* Session Progress Bar */}
          <div style={{ marginTop: 16, background: "rgba(255, 255, 255, 0.05)", borderRadius: "var(--radius-full)", padding: "4px 12px", border: "1px solid var(--panel-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-secondary)" }}>
              <span>WORKOUT PROGRESS</span>
              <span style={{ color: "var(--accent-primary)" }}>{completedSetsCount}/{totalSetsCount} sets ({progressPercent}%)</span>
            </div>
            <div style={{ width: "100%", height: 6, background: "rgba(0, 0, 0, 0.4)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, var(--accent-primary) 0%, #38bdf8 100%)",
                  borderRadius: "var(--radius-full)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        </header>

        <SessionExerciseList session={session} workout={workout} />
      </main>
      <RestTimerBar />
    </RestTimerProvider>
  );
}
