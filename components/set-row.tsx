"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import type { SetLog } from "@/lib/domain/types";
import { formatPreviousSetHint } from "@/lib/workouts/session";
import { logSet } from "@/app/session/[id]/actions";
import { useRestTimer } from "@/components/rest-timer";
import { CheckCircleIcon } from "@/components/icons";

// A saved value is always shown as-is (even legacy 0) so editing never silently replaces it;
// previous-session and target values are only suggestions and must be positive integers.
function getInitialPositiveInt(saved: number | null | undefined, ...suggestions: (number | null | undefined)[]): string {
  if (saved !== null && saved !== undefined && Number.isInteger(saved) && saved >= 0) return String(saved);
  const value = suggestions.find((candidate): candidate is number =>
    candidate !== null && candidate !== undefined && Number.isInteger(candidate) && candidate > 0
  );
  return value === undefined ? "" : String(value);
}

function CompleteSetButton({ isCompleted }: { isCompleted: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={isCompleted ? "set-complete-button done" : "set-complete-button"}
    >
      {pending ? "กำลังบันทึก…" : isCompleted ? "แก้ไขเซต" : "บันทึกเซต"}
    </button>
  );
}

export function SetRow({
  sessionId,
  workoutExerciseId,
  setNumber,
  isDuration,
  isBodyweight,
  targetRepMin,
  targetSecondsMin = null,
  log,
  previousLog,
  exerciseName,
  restSeconds,
  onCompleted,
}: {
  sessionId: string;
  workoutExerciseId: string;
  setNumber: number;
  isDuration: boolean;
  isBodyweight: boolean;
  targetRepMin: number | null;
  targetSecondsMin?: number | null;
  log: SetLog | undefined;
  previousLog: SetLog | undefined;
  exerciseName: string;
  restSeconds: number;
  onCompleted?: () => void;
}) {
  const { start } = useRestTimer();
  const [error, setError] = useState<string | null>(null);
  const previousHint = formatPreviousSetHint(previousLog, isDuration, !isBodyweight);
  const isCompleted = log?.completedAt != null;

  // Local state for interactive steppers while keeping inputs controlled/uncontrolled for form submit
  const [weight, setWeight] = useState<string>(
    log?.weightKg !== undefined && log?.weightKg !== null
      ? String(log.weightKg)
      : previousLog?.weightKg !== undefined && previousLog?.weightKg !== null
      ? String(previousLog.weightKg)
      : ""
  );

  const [reps, setReps] = useState(() => getInitialPositiveInt(log?.reps, previousLog?.reps, targetRepMin));

  const [duration, setDuration] = useState(() =>
    getInitialPositiveInt(log?.durationSeconds, previousLog?.durationSeconds, targetSecondsMin)
  );

  const [rir, setRir] = useState<string>(
    log?.rir !== undefined && log?.rir !== null
      ? String(log.rir)
      : previousLog?.rir !== undefined && previousLog?.rir !== null
      ? String(previousLog.rir)
      : ""
  );

  // Editing any field dismisses a stale error from the previous save attempt.
  function edit(setter: (value: string) => void, value: string) {
    setError(null);
    setter(value);
  }

  function adjustWeight(delta: number) {
    const current = parseFloat(weight) || 0;
    const next = Math.max(0, current + delta);
    edit(setWeight, next.toString());
  }

  function adjustReps(delta: number) {
    const current = parseInt(reps, 10) || 0;
    const next = Math.max(1, current + delta);
    edit(setReps, next.toString());
  }

  function adjustDuration(delta: number) {
    const current = parseInt(duration, 10) || 0;
    const next = Math.max(1, current + delta);
    edit(setDuration, next.toString());
  }

  async function completeSet(formData: FormData) {
    setError(null);
    let result;
    try {
      result = await logSet(formData);
    } catch {
      // The failure may have happened after the save, so don't claim the set is unsaved.
      setError("เกิดข้อผิดพลาดหรือเชื่อมต่อไม่สำเร็จ เซตนี้อาจถูกบันทึกแล้ว กรุณารีเฟรชหน้าเพื่อตรวจสอบ หรือลองบันทึกอีกครั้ง");
      return;
    }
    if (result.error !== null) {
      setError(result.error);
      return;
    }
    onCompleted?.();
    if (result.shouldStartRest) start(restSeconds, exerciseName);
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
                  min={1}
                  step={1}
                  required
                  value={duration}
                  onChange={(e) => edit(setDuration, e.target.value)}
                  placeholder={previousLog?.durationSeconds?.toString() ?? "กรอกวินาที"}
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
              {!isBodyweight ? (
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
                      onChange={(e) => edit(setWeight, e.target.value)}
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
              ) : null}

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
                    min={1}
                    step={1}
                    required
                    value={reps}
                    onChange={(e) => edit(setReps, e.target.value)}
                    placeholder="กรอกครั้ง"
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
            <span>RIR (แรงที่เหลือ)</span>
            <input type="hidden" name="rir" value={rir} />
            <div className="rir-selector" role="group" aria-label="จำนวนครั้งที่ยังทำต่อได้">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={rir === String(value) ? "active" : ""}
                  aria-pressed={rir === String(value)}
                  onClick={() => edit(setRir, String(value))}
                >
                  {value}
                </button>
              ))}
            </div>
          </label>
        </div>

        {previousHint ? (
          <div className="set-hint-pill">
            <span>Last: {previousHint}</span>
          </div>
        ) : null}

        {error ? <p className="error-message" role="alert">{error}</p> : null}
        <CompleteSetButton isCompleted={isCompleted} />
      </form>
    </li>
  );
}
