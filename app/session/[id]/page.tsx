import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { formatPrescription, program } from "@/lib/workouts/program";
import { createClient } from "@/lib/supabase/server";
import { getSessionDetail, isDurationExercise } from "@/lib/workouts/session";
import { getDefaultRestSeconds } from "@/lib/workouts/rest";
import { SetRow } from "@/components/set-row";
import { RestTimerBar, RestTimerProvider } from "@/components/rest-timer";
import { finishSession } from "@/app/session/[id]/actions";

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

  return (
    <RestTimerProvider>
      <main className="home-shell session-shell">
        <Link className="back-link" href={`/workout/${session.programDay}`}>← Back to workout plan</Link>
        <header className="home-header workout-header">
          <p className="eyebrow">DAY {session.programDay} · {workout.weekday}</p>
          <h1>{workout.titleTh}</h1>
          <p className="muted">Log each set as you finish it. Values from your last session show as hints.</p>
        </header>

        <ol className="session-exercise-list">
          {session.exercises.map((exercise, index) => {
            const prescription = workout.exercises.find((e) => e.id === exercise.exerciseId);
            const duration = isDurationExercise(exercise);
            const restSeconds = getDefaultRestSeconds(exercise);
            return (
              <li key={exercise.id} className="session-exercise">
                <div className="session-exercise-header">
                  <h2>{index + 1}. {exercise.name}</h2>
                  {prescription ? <span className="prescription">{formatPrescription(prescription)}</span> : null}
                </div>
                <ol className="set-list">
                  {Array.from({ length: exercise.targetSets }, (_, setIndex) => {
                    const setNumber = setIndex + 1;
                    return (
                      <SetRow
                        key={setNumber}
                        sessionId={session.id}
                        workoutExerciseId={exercise.id}
                        setNumber={setNumber}
                        isDuration={duration}
                        log={exercise.setLogs[setNumber]}
                        previousLog={exercise.previousSets[setNumber]}
                        exerciseName={exercise.name}
                        restSeconds={restSeconds}
                      />
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>

        {session.completedAt ? (
          <Link href={`/history/${session.id}`} className="start-button finish-button">View summary</Link>
        ) : (
          <form action={finishSession} className="finish-form">
            <input type="hidden" name="sessionId" value={session.id} />
            <button type="submit" className="start-button finish-button">Finish workout</button>
          </form>
        )}
      </main>
      <RestTimerBar />
    </RestTimerProvider>
  );
}
