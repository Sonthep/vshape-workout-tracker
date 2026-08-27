"use client";

import { useState } from "react";
import type { SessionDetail } from "@/lib/workouts/session";
import { type WorkoutDay, formatPrescription } from "@/lib/workouts/program";
import { isDurationExercise } from "@/lib/workouts/session";
import { getDefaultRestSeconds } from "@/lib/workouts/rest";
import { SetRow } from "@/components/set-row";
import { ExerciseGuideModal, ExerciseInfoButton } from "@/components/exercise-guide-modal";
import { ExerciseMotionPreview } from "@/components/exercise-motion-preview";

export function SessionExerciseList({
  session,
  workout,
}: {
  session: SessionDetail;
  workout: WorkoutDay;
}) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  return (
    <>
      <ol className="session-exercise-list">
        {session.exercises.map((exercise, index) => {
          const prescription = workout.exercises.find((e) => e.id === exercise.exerciseId);
          const duration = isDurationExercise(exercise);
          const restSeconds = getDefaultRestSeconds(exercise);
          return (
            <li key={exercise.id} className="session-exercise">
              <div className="session-exercise-header">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="exercise-badge-num">{index + 1}</span>
                  <div className="exercise-thumb-wrap">
                    <img
                      src={`/exercises/${exercise.exerciseId}.jpg`}
                      alt={exercise.name}
                      className="exercise-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <h2>{exercise.name}</h2>
                  <ExerciseInfoButton
                    exerciseId={exercise.exerciseId}
                    onClick={(id) => setSelectedExerciseId(id)}
                  />
                </div>
                {prescription ? <span className="prescription">{formatPrescription(prescription)}</span> : null}
              </div>
              <ExerciseMotionPreview
                exerciseId={exercise.exerciseId}
                exerciseName={exercise.name}
              />
              <ol className="set-list">
                {Array.from({ length: exercise.targetSets }, (_, setIndex) => {
                  const setNumber = setIndex + 1;
                  return (
                    <SetRow
                      key={setNumber}
                      sessionId={session.id}
                      workoutExerciseId={exercise.id}
                      setNumber={setNumber}
                      isDuration={duration}
                      log={exercise.setLogs[setNumber]}
                      previousLog={exercise.previousSets[setNumber]}
                      exerciseName={exercise.name}
                      restSeconds={restSeconds}
                    />
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>

      <ExerciseGuideModal
        exerciseId={selectedExerciseId}
        isOpen={selectedExerciseId !== null}
        onClose={() => setSelectedExerciseId(null)}
      />
    </>
  );
}
