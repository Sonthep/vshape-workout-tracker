import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { formatPrescription, program } from "@/lib/workouts/program";
import { createClient } from "@/lib/supabase/server";
import { startSession } from "./actions";

export default async function WorkoutPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const workout = program.find((item) => item.day === Number(day));
  if (!workout) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="home-shell">
      <Link className="back-link" href="/">← Back to workout plan</Link>
      <header className="home-header workout-header">
        <p className="eyebrow">DAY {workout.day} · {workout.weekday}</p>
        <h1>{workout.titleTh}</h1>
        <p className="muted">Your session is ready. Start logging when you begin your first set.</p>
      </header>
      <ol className="exercise-list workout-exercises">
        {workout.exercises.map((exercise, index) => (
          <li key={exercise.id} className="exercise-row">
            <div><span>{index + 1}. {exercise.name}</span></div>
            <span className="prescription">{formatPrescription(exercise)}</span>
          </li>
        ))}
      </ol>
      <form action={startSession}>
        <input type="hidden" name="day" value={workout.day} />
        <button type="submit" className="start-button">Start session</button>
      </form>
    </main>
  );
}
