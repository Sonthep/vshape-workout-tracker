import Link from "next/link";
import { getNextWorkout, program } from "@/lib/workouts/program";
import { WeeklySchedule } from "@/components/weekly-schedule";
import { NextWorkoutCard } from "@/components/next-workout-card";
import { CameraIcon, ChartIcon, FireIcon, HistoryIcon } from "@/components/icons";

export default function HomePage() {
  const workout = getNextWorkout(new Date());

  return (
    <main className="home-shell">
      {/* Hero Welcome Banner */}
      <section className="hero-banner" aria-label="Welcome">
        <div className="hero-title-group">
          <div className="hero-badge-pill">
            <FireIcon className="w-3.5 h-3.5" />
            <span>4-Day DB Routine</span>
          </div>
          <h1>Workout Tracker</h1>
          <p className="muted">Dumbbell + Floor + Bodyweight only · V-Shape Optimized</p>
        </div>
      </section>

      {/* Primary Next Workout Card with Exercise Guide Modal Support */}
      <NextWorkoutCard workout={workout} />

      {/* Interactive Weekly Schedule with Guide Support */}
      <WeeklySchedule program={program} todayDayNumber={workout.day} />

      {/* Quick Navigation Cards */}
      <section aria-label="Quick Features">
        <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>EXPLORE & TRACK</span>
        <div className="home-links-grid">
          <Link className="home-feature-card" href="/history">
            <div className="feature-icon-wrap history-color">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <span className="feature-card-label">History</span>
          </Link>

          <Link className="home-feature-card" href="/progress">
            <div className="feature-icon-wrap progress-color">
              <ChartIcon className="w-5 h-5" />
            </div>
            <span className="feature-card-label">Progress</span>
          </Link>

          <Link className="home-feature-card" href="/photos">
            <div className="feature-icon-wrap photos-color">
              <CameraIcon className="w-5 h-5" />
            </div>
            <span className="feature-card-label">Photos</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
