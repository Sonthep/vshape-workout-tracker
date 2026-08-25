import type { SetLog } from "@/lib/domain/types";
import { formatPreviousSetHint } from "@/lib/workouts/session";
import { logSet } from "@/app/session/[id]/actions";

export function SetRow({
  sessionId,
  workoutExerciseId,
  setNumber,
  isDuration,
  log,
  previousLog,
}: {
  sessionId: string;
  workoutExerciseId: string;
  setNumber: number;
  isDuration: boolean;
  log: SetLog | undefined;
  previousLog: SetLog | undefined;
}) {
  const previousHint = formatPreviousSetHint(previousLog, isDuration);
  const isCompleted = log?.completedAt != null;

  return (
    <li className="set-row">
      <form action={logSet} className="set-form">
        <input type="hidden" name="sessionId" value={sessionId} />
        <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />
        <input type="hidden" name="setNumber" value={setNumber} />

        <span className="set-number">Set {setNumber}</span>

        <div className="set-fields">
          {isDuration ? (
            <label className="set-field">
              <span>Duration (sec)</span>
              <input
                type="number"
                inputMode="numeric"
                name="durationSeconds"
                min={0}
                defaultValue={log?.durationSeconds ?? undefined}
                placeholder={previousLog?.durationSeconds?.toString()}
              />
            </label>
          ) : (
            <>
              <label className="set-field">
                <span>Weight (kg)</span>
                <input
                  type="number"
                  inputMode="decimal"
                  name="weightKg"
                  min={0}
                  step={0.5}
                  defaultValue={log?.weightKg ?? undefined}
                  placeholder={previousLog?.weightKg?.toString()}
                />
              </label>
              <label className="set-field">
                <span>Reps</span>
                <input
                  type="number"
                  inputMode="numeric"
                  name="reps"
                  min={0}
                  defaultValue={log?.reps ?? undefined}
                  placeholder={previousLog?.reps?.toString()}
                />
              </label>
            </>
          )}
          <label className="set-field set-field-rir">
            <span>RIR</span>
            <input
              type="number"
              inputMode="numeric"
              name="rir"
              min={0}
              max={5}
              defaultValue={log?.rir ?? undefined}
              placeholder={previousLog?.rir?.toString()}
            />
          </label>
        </div>

        {previousHint ? <p className="set-hint">{previousHint}</p> : null}

        <button type="submit" className={isCompleted ? "set-complete-button done" : "set-complete-button"}>
          {isCompleted ? "Update set" : "Complete set"}
        </button>
      </form>
    </li>
  );
}
