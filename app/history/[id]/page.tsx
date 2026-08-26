import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { formatPrescription, program } from "@/lib/workouts/program";
import { createClient } from "@/lib/supabase/server";
import { formatSetValue, getSessionDetail, isDurationExercise } from "@/lib/workouts/session";
import { formatVolumeDelta, summarizeSession } from "@/lib/workouts/history";

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const session = await getSessionDetail(supabase, id, user.id);
  if (!session || !session.completedAt) notFound();

  const workout = program.find((item) => item.day === session.programDay);
  if (!workout) notFound();

  const summary = summarizeSession(session.exercises);
  const volumeDelta = formatVolumeDelta(summary.totalVolumeKg, summary.previousVolumeKg);

  return (
    <main className="home-shell">
      <Link className="back-link" href="/history">← Back to history</Link>
      <header className="home-header workout-header">
        <p className="eyebrow">DAY {session.programDay} · {workout.weekday}</p>
        <h1>{workout.titleTh}</h1>
        <p className="muted">{formatDateTime(session.completedAt)}</p>
      </header>

      <section className="summary-card" aria-label="Session summary">
        <div className="summary-stat">
          <span className="summary-value">{summary.completedSets}/{summary.totalSets}</span>
          <span className="summary-label">Sets completed</span>
        </div>
        <div className="summary-stat">
          <span className="summary-value">{Math.round(summary.totalVolumeKg)} kg</span>
          <span className="summary-label">Total volume</span>
        </div>
        {volumeDelta ? <p className="summary-delta">{volumeDelta}</p> : null}
      </section>

      <ol className="session-exercise-list">
        {session.exercises.map((exercise, index) => {
          const prescription = workout.exercises.find((e) => e.id === exercise.exerciseId);
          const duration = isDurationExercise(exercise);
          return (
            <li key={exercise.id} className="session-exercise">
              <div className="session-exercise-header">
                <h2>{index + 1}. {exercise.name}</h2>
                {prescription ? <span className="prescription">{formatPrescription(prescription)}</span> : null}
              </div>
              <ol className="history-set-list">
                {Array.from({ length: exercise.targetSets }, (_, setIndex) => {
                  const setNumber = setIndex + 1;
                  return (
                    <li key={setNumber} className="history-set-row">
                      <span className="set-number">Set {setNumber}</span>
                      <span>{formatSetValue(exercise.setLogs[setNumber], duration)}</span>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
