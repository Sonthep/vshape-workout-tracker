"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SessionDetail } from "@/lib/workouts/session";
import { type WorkoutDay, formatPrescription } from "@/lib/workouts/program";
import { isBodyweightExercise, isDurationExercise } from "@/lib/workouts/session";
import { getDefaultRestSeconds } from "@/lib/workouts/rest";
import { SetRow } from "@/components/set-row";
import { ExerciseGuideModal, ExerciseInfoButton } from "@/components/exercise-guide-modal";
import { ExerciseMotionPreview } from "@/components/exercise-motion-preview";
import { finishSession } from "@/app/session/[id]/actions";
import { CheckCircleIcon, ChevronRightIcon, TrophyIcon } from "@/components/icons";

function completedSetKeys(session: SessionDetail): Set<string> {
  return new Set(
    session.exercises.flatMap((exercise) =>
      Object.entries(exercise.setLogs)
        .filter(([, log]) => log?.completedAt != null)
        .map(([setNumber]) => `${exercise.id}:${setNumber}`),
    ),
  );
}

function firstIncompleteExerciseIndex(session: SessionDetail): number {
  const index = session.exercises.findIndex((exercise) =>
    Array.from({ length: exercise.targetSets }, (_, setIndex) => setIndex + 1).some(
      (setNumber) => exercise.setLogs[setNumber]?.completedAt == null,
    ),
  );
  return index === -1 ? Math.max(0, session.exercises.length - 1) : index;
}

export function SessionExerciseList({
  session,
  workout,
}: {
  session: SessionDetail;
  workout: WorkoutDay;
}) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => firstIncompleteExerciseIndex(session));
  const [locallyCompletedSets, setLocallyCompletedSets] = useState(() => completedSetKeys(session));

  const exercise = session.exercises[activeIndex];
  if (!exercise) return null;

  const prescription = workout.exercises.find((item) => item.id === exercise.exerciseId);
  const duration = isDurationExercise(exercise);
  const restSeconds = getDefaultRestSeconds(exercise);
  const isSetComplete = (setNumber: number) =>
    exercise.setLogs[setNumber]?.completedAt != null || locallyCompletedSets.has(`${exercise.id}:${setNumber}`);
  const completedSets = Array.from({ length: exercise.targetSets }, (_, index) => index + 1).filter(isSetComplete).length;
  const exerciseComplete = completedSets === exercise.targetSets;
  const isFirstExercise = activeIndex === 0;
  const isLastExercise = activeIndex === session.exercises.length - 1;
  const allExercisesComplete = session.exercises.every((item) =>
    Array.from({ length: item.targetSets }, (_, index) => index + 1).every(
      (setNumber) => item.setLogs[setNumber]?.completedAt != null || locallyCompletedSets.has(`${item.id}:${setNumber}`),
    ),
  );

  function markSetCompleted(setNumber: number) {
    setLocallyCompletedSets((current) => {
      const next = new Set(current);
      next.add(`${exercise.id}:${setNumber}`);
      return next;
    });
  }

  return (
    <>
      <section className="session-focus-nav" aria-label="ความคืบหน้ารายท่า">
        <div className="session-focus-copy">
          <span className="section-tag">CURRENT EXERCISE</span>
          <strong>ท่าที่ {activeIndex + 1} จาก {session.exercises.length}</strong>
        </div>
        <div className="exercise-stepper" role="tablist" aria-label="เลือกท่าออกกำลังกาย">
          {session.exercises.map((item, index) => {
            const isComplete = Array.from({ length: item.targetSets }, (_, setIndex) => setIndex + 1).every(
              (setNumber) => item.setLogs[setNumber]?.completedAt != null || locallyCompletedSets.has(`${item.id}:${setNumber}`),
            );
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`ไปท่าที่ ${index + 1}: ${item.name}`}
                className={`${index === activeIndex ? "active" : ""} ${isComplete ? "complete" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                {isComplete ? <CheckCircleIcon className="w-4 h-4" /> : index + 1}
              </button>
            );
          })}
        </div>
      </section>

      <ol className="session-exercise-list">
        <li key={exercise.id} className="session-exercise">
              <div className="session-exercise-header">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="exercise-badge-num">{activeIndex + 1}</span>
                  <div className="exercise-thumb-wrap">
                    <Image
                      src={`/exercises/${exercise.exerciseId}.jpg`}
                      alt={exercise.name}
                      className="exercise-thumb-img"
                      width={44}
                      height={44}
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
                      isBodyweight={isBodyweightExercise(exercise.exerciseId)}
                      targetRepMin={exercise.targetRepMin}
                      log={exercise.setLogs[setNumber]}
                      previousLog={exercise.previousSets[setNumber]}
                      exerciseName={exercise.name}
                      restSeconds={restSeconds}
                      onCompleted={() => markSetCompleted(setNumber)}
                    />
                  );
                })}
              </ol>
        </li>
      </ol>

      <div className="session-exercise-nav">
        <button
          type="button"
          className="exercise-nav-button secondary"
          disabled={isFirstExercise}
          onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
        >
          ← ท่าก่อนหน้า
        </button>

        <div className={`exercise-completion-state ${exerciseComplete ? "complete" : ""}`} aria-live="polite">
          {exerciseComplete ? (
            <><CheckCircleIcon className="w-4 h-4" /> ครบทุกเซตแล้ว</>
          ) : (
            `${completedSets}/${exercise.targetSets} เซต`
          )}
        </div>

        {isLastExercise ? (
          session.completedAt ? (
            <Link href={`/history/${session.id}`} className="exercise-nav-button primary">
              ดูสรุป <ChevronRightIcon className="w-4 h-4" />
            </Link>
          ) : (
            <form action={finishSession}>
              <input type="hidden" name="sessionId" value={session.id} />
              <button
                type="submit"
                className="exercise-nav-button primary"
                disabled={!allExercisesComplete}
                title={!allExercisesComplete ? "Complete every set before finishing" : undefined}
              >
                <TrophyIcon className="w-4 h-4" /> จบการฝึก
              </button>
            </form>
          )
        ) : (
          <button
            type="button"
            className="exercise-nav-button primary"
            onClick={() => setActiveIndex((current) => Math.min(session.exercises.length - 1, current + 1))}
          >
            ท่าถัดไป <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <ExerciseGuideModal
        exerciseId={selectedExerciseId}
        isOpen={selectedExerciseId !== null}
        onClose={() => setSelectedExerciseId(null)}
      />
    </>
  );
}
