"use client";

import { useState } from "react";
import type { SetLog } from "@/lib/domain/types";
import { formatPreviousSetHint } from "@/lib/workouts/session";
import { logSet } from "@/app/session/[id]/actions";
import { useRestTimer } from "@/components/rest-timer";
import { CheckCircleIcon } from "@/components/icons";

export function SetRow({
  sessionId,
  workoutExerciseId,
  setNumber,
  isDuration,
  log,
  previousLog,
  exerciseName,
  restSeconds,
}: {
  sessionId: string;
  workoutExerciseId: string;
  setNumber: number;
  isDuration: boolean;
  log: SetLog | undefined;
  previousLog: SetLog | undefined;
  exerciseName: string;
  restSeconds: number;
}) {
  const { start } = useRestTimer();
  const previousHint = formatPreviousSetHint(previousLog, isDuration);
  const isCompleted = log?.completedAt != null;

  // Local state for interactive steppers while keeping inputs controlled/uncontrolled for form submit
  const [weight, setWeight] = useState<string>(
    log?.weightKg !== undefined && log?.weightKg !== null
      ? String(log.weightKg)
      : previousLog?.weightKg !== undefined && previousLog?.weightKg !== null
      ? String(previousLog.weightKg)
      : ""
  );

  const [reps, setReps] = useState<string>(
    log?.reps !== undefined && log?.reps !== null
      ? String(log.reps)
      : previousLog?.reps !== undefined && previousLog?.reps !== null
      ? String(previousLog.reps)
      : ""
  );

  const [duration, setDuration] = useState<string>(
    log?.durationSeconds !== undefined && log?.durationSeconds !== null
      ? String(log.durationSeconds)
      : previousLog?.durationSeconds !== undefined && previousLog?.durationSeconds !== null
      ? String(previousLog.durationSeconds)
      : ""
  );

  const [rir, setRir] = useState<string>(
    log?.rir !== undefined && log?.rir !== null
      ? String(log.rir)
      : previousLog?.rir !== undefined && previousLog?.rir !== null
      ? String(previousLog.rir)
      : ""
  );

  function adjustWeight(delta: number) {
    const current = parseFloat(weight) || 0;
    const next = Math.max(0, current + delta);
    setWeight(next.toString());
  }

  function adjustReps(delta: number) {
    const current = parseInt(reps, 10) || 0;
    const next = Math.max(0, current + delta);
    setReps(next.toString());
  }

  function adjustDuration(delta: number) {
    const current = parseInt(duration, 10) || 0;
    const next = Math.max(0, current + delta);
    setDuration(next.toString());
  }

  async function completeSet(formData: FormData) {
    await logSet(formData);
    start(restSeconds, exerciseName);
  }

  return (
    <li className={`set-row ${isCompleted ? "completed-set" : ""}`}>
      <form action={completeSet} className="set-form">
        <input type="hidden" name="sessionId" value={sessionId} />
        <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />
        <input type="hidden" name="setNumber" value={setNumber} />

        <div className="set-row-top">
          <span className="set-number-tag">Set {setNumber}</span>
          {isCompleted && (
            <span className="set-check-badge">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Done</span>
            </span>
          )}
        </div>

        <div className="set-fields">
          {isDuration ? (
            <label className="set-field">
              <span>Duration (sec)</span>
              <div className="stepper-input-wrap">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => adjustDuration(-5)}
                  aria-label="Decrease duration"
                >
                  −
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  name="durationSeconds"
                  min={0}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={previousLog?.durationSeconds?.toString() ?? "30"}
                />
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => adjustDuration(5)}
                  aria-label="Increase duration"
                >
                  +
                </button>
              </div>
            </label>
          ) : (
            <>
              <label className="set-field">
                <span>Weight (kg)</span>
                <div className="stepper-input-wrap">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => adjustWeight(-1)}
                    aria-label="Decrease weight"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    inputMode="decimal"
                    name="weightKg"
                    min={0}
                    step={0.5}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={previousLog?.weightKg?.toString() ?? "10"}
                  />
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => adjustWeight(1)}
                    aria-label="Increase weight"
                  >
                    +
                  </button>
                </div>
              </label>

              <label className="set-field">
                <span>Reps</span>
                <div className="stepper-input-wrap">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => adjustReps(-1)}
                    aria-label="Decrease reps"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    name="reps"
                    min={0}
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder={previousLog?.reps?.toString() ?? "10"}
                  />
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => adjustReps(1)}
                    aria-label="Increase reps"
                  >
                    +
                  </button>
                </div>
              </label>
            </>
          )}

          <label className="set-field set-field-rir">
            <span>RIR</span>
            <div className="stepper-input-wrap">
              <input
                type="number"
                inputMode="numeric"
                name="rir"
                min={0}
                max={5}
                value={rir}
                onChange={(e) => setRir(e.target.value)}
                placeholder={previousLog?.rir?.toString() ?? "2"}
              />
            </div>
          </label>
        </div>

        {previousHint ? (
          <div className="set-hint-pill">
            <span>Last: {previousHint}</span>
          </div>
        ) : null}

        <button type="submit" className={isCompleted ? "set-complete-button done" : "set-complete-button"}>
          {isCompleted ? "Update set" : "Complete set"}
        </button>
      </form>
    </li>
  );
}
