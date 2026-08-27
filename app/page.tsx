import { getNextWorkout, program } from "@/lib/workouts/program";
import { WeeklySchedule } from "@/components/weekly-schedule";
import { NextWorkoutCard } from "@/components/next-workout-card";
import { FireIcon } from "@/components/icons";

export default function HomePage() {
  const workout = getNextWorkout(new Date());

  return (
    <main className="home-shell">
      {/* Hero Welcome Banner */}
      <section className="hero-banner" aria-label="Welcome">
        <div className="hero-title-group">
          <div className="hero-badge-pill">
            <FireIcon className="w-3.5 h-3.5" />
            <span>ฝึก 4 วันต่อสัปดาห์</span>
          </div>
          <h1>โปรแกรมออกกำลังกาย</h1>
          <p className="muted">ฝึกง่ายด้วยดัมเบล พื้น และน้ำหนักตัว</p>
        </div>
      </section>

      {/* Primary Next Workout Card with Exercise Guide Modal Support */}
      <NextWorkoutCard workout={workout} />

      {/* Interactive Weekly Schedule with Guide Support */}
      <WeeklySchedule program={program} todayDayNumber={workout.day} />

    </main>
  );
}
