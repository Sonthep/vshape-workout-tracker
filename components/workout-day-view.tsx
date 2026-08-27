"use client";

import { useState } from "react";
import { type WorkoutDay, formatPrescription } from "@/lib/workouts/program";
import { ExerciseGuideModal, ExerciseInfoButton } from "@/components/exercise-guide-modal";
import { PlayIcon } from "@/components/icons";

export function WorkoutDayView({
  workout,
  startSessionAction,
}: {
  workout: WorkoutDay;
  startSessionAction: (formData: FormData) => Promise<void>;
}) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  return (
    <>
      <ol className="exercise-list workout-exercises">
        {workout.exercises.map((exercise, index) => (
          <li key={exercise.id} className="exercise-row">
            <div className="exercise-row-info">
              <span className="exercise-badge-num">{index + 1}</span>
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

      <form action={startSessionAction}>
        <input type="hidden" name="day" value={workout.day} />
        <button type="submit" className="start-button">
          <PlayIcon className="w-4 h-4" />
          <span>เริ่มเซสชัน</span>
        </button>
      </form>

      <ExerciseGuideModal
        exerciseId={selectedExerciseId}
        isOpen={selectedExerciseId !== null}
        onClose={() => setSelectedExerciseId(null)}
      />
    </>
  );
}
