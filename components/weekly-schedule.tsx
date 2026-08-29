"use client";

import Link from "next/link";
import { useState } from "react";
import { type WorkoutDay, formatPrescription } from "@/lib/workouts/program";
import { ChevronRightIcon, MuscleTagIcon, PlayIcon } from "@/components/icons";
import { ExerciseGuideModal, ExerciseInfoButton } from "@/components/exercise-guide-modal";

const weekdayTh: Record<WorkoutDay["weekday"], string> = {
  Monday: "จันทร์",
  Tuesday: "อังคาร",
  Thursday: "พฤหัส",
  Saturday: "เสาร์",
};

export function WeeklySchedule({
  program,
  todayDayNumber,
}: {
  program: WorkoutDay[];
  todayDayNumber: number;
}) {
  const [selectedDay, setSelectedDay] = useState<number>(todayDayNumber);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  const currentWorkout = program.find((w) => w.day === selectedDay) ?? program[0];

  return (
    <>
      <section className="weekly-schedule-card" aria-labelledby="schedule-heading">
        <div className="schedule-header">
          <div>
            <span className="section-tag">YOUR PROGRAM</span>
            <h2 id="schedule-heading" className="section-title">แผนฝึกประจำสัปดาห์</h2>
          </div>
          <span className="days-counter"><strong>4</strong> TRAINING DAYS</span>
        </div>

        {/* Weekday Selector Tabs */}
        <div className="day-tabs-scroll">
          <div className="day-tabs" role="tablist" aria-label="Workout days">
            {program.map((day) => {
              const isSelected = day.day === selectedDay;
              const isToday = day.day === todayDayNumber;
              return (
                <button
                  key={day.day}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`day-tab-btn ${isSelected ? "active" : ""} ${isToday ? "today-highlight" : ""}`}
                  onClick={() => setSelectedDay(day.day)}
                >
                  <span className="day-tab-weekday">{weekdayTh[day.weekday]}</span>
                  <span className="day-tab-day">DAY 0{day.day}</span>
                  {isToday && <span className="today-dot" title="Today's workout" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Preview */}
        <div className="day-detail-panel">
          <div className="day-detail-top">
            <div>
              <div className="day-badges-row">
                <span className="day-num-badge">DAY 0{currentWorkout.day}</span>
                <span className="day-name-badge">{weekdayTh[currentWorkout.weekday]}</span>
              </div>
              <h3 className="day-thai-title" lang="th">{currentWorkout.titleTh}</h3>
            </div>
            <Link href={`/workout/${currentWorkout.day}`} className="day-quick-start">
              <span>เริ่มฝึก</span>
              <PlayIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Focus muscle tags */}
          <div className="focus-tags">
            {currentWorkout.focus.map((tag) => (
              <span key={tag} className="focus-tag">
                <MuscleTagIcon name={tag} />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Exercises preview accordion */}
          <div className="schedule-exercise-list">
            {currentWorkout.exercises.map((exercise, idx) => (
              <div key={exercise.id} className="schedule-exercise-item">
                <div className="schedule-exercise-left">
                  <span className="exercise-idx">{idx + 1}</span>
                  <div className="exercise-thumb-wrap" style={{ width: 38, height: 38 }}>
                    <img
                      src={`/exercises/${exercise.id}.jpg`}
                      alt={exercise.name}
                      className="exercise-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span className="exercise-title">{exercise.name}</span>
                      <ExerciseInfoButton
                        exerciseId={exercise.id}
                        onClick={(id) => setSelectedExerciseId(id)}
                      />
                    </div>
                    {exercise.priority && <span className="priority-pill">V-Shape Focus</span>}
                  </div>
                </div>
                <span className="prescription-text">{formatPrescription(exercise)}</span>
              </div>
            ))}
          </div>

          <div className="day-panel-footer">
            <Link href={`/workout/${currentWorkout.day}`} className="view-day-btn">
              <span>ดูโปรแกรม DAY 0{currentWorkout.day} ทั้งหมด</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ExerciseGuideModal
        exerciseId={selectedExerciseId}
        isOpen={selectedExerciseId !== null}
        onClose={() => setSelectedExerciseId(null)}
      />
    </>
  );
}
