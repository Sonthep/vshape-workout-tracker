"use client";

import Link from "next/link";
import { type WorkoutDay } from "@/lib/workouts/program";
import { DumbbellIcon, MuscleTagIcon, PlayIcon } from "@/components/icons";

export function NextWorkoutCard({ workout }: { workout: WorkoutDay }) {
  const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const estimatedMinutes = Math.max(20, Math.round((totalSets * 2.5) / 5) * 5);

  return (
      <section className="next-workout" aria-labelledby="next-workout-heading">
        <span className="next-workout-watermark" aria-hidden="true">0{workout.day}</span>
        <div className="next-workout-top">
          <div>
            <span className="eyebrow">UP NEXT / การฝึกครั้งถัดไป</span>
            <div className="workout-day-pill">
              <DumbbellIcon className="w-3.5 h-3.5" />
              <span>DAY {workout.day} · {workout.weekday}</span>
            </div>
            <h2 id="next-workout-heading" className="workout-heading" lang="th">{workout.titleTh}</h2>
            <p className="workout-support-copy">เน้นฟอร์มให้คม คุมจังหวะทุกครั้ง และบันทึกน้ำหนักเพื่อพัฒนาต่อเนื่อง</p>
          </div>
        </div>

        {/* Focus tags */}
        <div className="focus-tags">
          {workout.focus.map((item) => (
            <span key={item} className="focus-tag">
              <MuscleTagIcon name={item} />
              <span>{item}</span>
            </span>
          ))}
        </div>

        <div className="workout-summary" aria-label="สรุปการฝึกวันนี้">
          <span><strong>{workout.exercises.length}</strong><small>ท่า</small></span>
          <span><strong>{totalSets}</strong><small>เซต</small></span>
          <span><strong>{estimatedMinutes}</strong><small>นาที</small></span>
        </div>

        <Link className="start-button" href={`/workout/${workout.day}`}>
          <PlayIcon className="w-4 h-4" />
          <span>เริ่มฝึกวันนี้</span>
          <span className="start-button-arrow" aria-hidden="true">→</span>
        </Link>
      </section>
  );
}
