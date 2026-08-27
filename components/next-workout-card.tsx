"use client";

import Link from "next/link";
import { useState } from "react";
import { type WorkoutDay, formatPrescription } from "@/lib/workouts/program";
import { DumbbellIcon, MuscleTagIcon, PlayIcon } from "@/components/icons";
import { ExerciseGuideModal, ExerciseInfoButton } from "@/components/exercise-guide-modal";

export function NextWorkoutCard({ workout }: { workout: WorkoutDay }) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  return (
    <>
      <section className="next-workout" aria-labelledby="next-workout-heading">
        <div className="next-workout-top">
          <div>
            <span className="eyebrow">NEXT WORKOUT</span>
            <div className="workout-day-pill">
              <DumbbellIcon className="w-3.5 h-3.5" />
              <span>DAY {workout.day} · {workout.weekday}</span>
            </div>
            <h2 id="next-workout-heading" className="workout-heading" lang="th">{workout.titleTh}</h2>
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

        {/* Exercise preview list */}
        <ol className="exercise-list">
          {workout.exercises.map((exercise, idx) => (
            <li key={exercise.id} className="exercise-row">
              <div className="exercise-row-info">
                <span className="exercise-badge-num">{idx + 1}</span>
                <div className="exercise-thumb-wrap">
                  <img
                    src={`/exercises/${exercise.id}.jpg`}
                    alt={exercise.name}
                    className="exercise-thumb-img"
                    loading="lazy"
                  />
                </div>
                <div className="exercise-name-wrap">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span className="exercise-name">{exercise.name}</span>
                    <ExerciseInfoButton
                      exerciseId={exercise.id}
                      onClick={(id) => setSelectedExerciseId(id)}
                    />
                  </div>
                  {exercise.priority ? (
                    <span className="priority-label">
                      <span>⚡ Priority</span>
                    </span>
                  ) : null}
                </div>
              </div>
              <span className="prescription">{formatPrescription(exercise)}</span>
            </li>
          ))}
        </ol>

        <Link className="start-button" href={`/workout/${workout.day}`}>
          <PlayIcon className="w-4 h-4" />
          <span>Start workout</span>
        </Link>
      </section>

      <ExerciseGuideModal
        exerciseId={selectedExerciseId}
        isOpen={selectedExerciseId !== null}
        onClose={() => setSelectedExerciseId(null)}
      />
    </>
  );
}
