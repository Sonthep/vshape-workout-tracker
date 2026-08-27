import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { program } from "@/lib/workouts/program";
import { createClient } from "@/lib/supabase/server";
import { startSession } from "./actions";
import { DumbbellIcon, MuscleTagIcon } from "@/components/icons";
import { WorkoutDayView } from "@/components/workout-day-view";

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
        <div className="workout-day-pill">
          <DumbbellIcon className="w-3.5 h-3.5" />
          <span>DAY {workout.day} · {workout.weekday}</span>
        </div>
        <h1 lang="th" style={{ margin: "10px 0 6px" }}>{workout.titleTh}</h1>
        <div className="focus-tags" style={{ margin: "4px 0 12px" }}>
          {workout.focus.map((tag) => (
            <span key={tag} className="focus-tag">
              <MuscleTagIcon name={tag} />
              <span>{tag}</span>
            </span>
          ))}
        </div>
        <p className="muted">Your session is ready. Tap any exercise to review form cues, or start logging when you begin your first set.</p>
      </header>

      <WorkoutDayView workout={workout} startSessionAction={startSession} />
    </main>
  );
}
