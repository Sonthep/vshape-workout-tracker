import { getNextWorkout, program } from "@/lib/workouts/program";
import { WeeklySchedule } from "@/components/weekly-schedule";
import { NextWorkoutCard } from "@/components/next-workout-card";
import { FireIcon } from "@/components/icons";

export default function HomePage() {
  const workout = getNextWorkout(new Date());

  return (
    <main className="home-shell">
      <section className="hero-banner" aria-label="Welcome">
        <div className="hero-title-group">
          <div className="hero-badge-pill">
            <FireIcon className="w-3.5 h-3.5" />
            <span>HOME TRAINING / 4 DAYS</span>
          </div>
          <h1>สร้างทรง<br /><span>V-SHAPE</span></h1>
          <p className="hero-copy">โปรแกรมกระชับ เข้าใจง่าย และทำได้จริง<br />ด้วยดัมเบลคู่เดียวที่บ้าน</p>
        </div>
        <div className="hero-monogram" aria-hidden="true">V</div>
        <div className="hero-plan-strip" aria-label="รายละเอียดโปรแกรม">
          <span><strong>04</strong> วันฝึก</span>
          <span><strong>30–50</strong> นาที</span>
          <span><strong>01</strong> เป้าหมาย</span>
        </div>
      </section>

      <NextWorkoutCard workout={workout} />

      <WeeklySchedule program={program} todayDayNumber={workout.day} />
    </main>
  );
}
