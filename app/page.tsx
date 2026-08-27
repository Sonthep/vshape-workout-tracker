import Link from "next/link";
import { formatPrescription, getNextWorkout, program } from "@/lib/workouts/program";

export default function HomePage() {
  const workout = getNextWorkout(new Date());

  return (
    <main className="home-shell">
      <header className="home-header">
        <p className="eyebrow">V-SHAPE</p>
        <h1>Workout Tracker</h1>
        <p className="muted">Dumbbell + Floor + Bodyweight only</p>
      </header>

      <section className="next-workout" aria-labelledby="next-workout-heading">
        <p className="eyebrow">NEXT WORKOUT</p>
        <p className="workout-day">DAY {workout.day} · {workout.weekday}</p>
        <h2 id="next-workout-heading" lang="th">{workout.titleTh}</h2>
        <p className="muted">{workout.focus.join(" · ")}</p>

        <ol className="exercise-list">
          {workout.exercises.map((exercise) => (
            <li key={exercise.id} className="exercise-row">
              <div>
                <span>{exercise.name}</span>
                {exercise.priority ? <span className="priority-label">Priority</span> : null}
              </div>
              <span className="prescription">{formatPrescription(exercise)}</span>
            </li>
          ))}
        </ol>

        <Link className="start-button" href={`/workout/${workout.day}`}>Start workout</Link>
      </section>

      <section className="schedule" aria-labelledby="schedule-heading">
        <h2 id="schedule-heading">Weekly schedule</h2>
        <div className="schedule-days">
          {program.map((day) => <span key={day.day}>{day.weekday.slice(0, 3)}</span>)}
        </div>
      </section>

      <div className="home-links">
        <Link className="history-link-home" href="/history">View workout history →</Link>
        <Link className="history-link-home" href="/progress">Track body progress →</Link>
        <Link className="history-link-home" href="/photos">View progress photos →</Link>
      </div>
    </main>
  );
}
