"use client";

import { useActionState } from "react";
import { logMeasurement, type LogMeasurementState } from "@/app/progress/actions";

const initialState: LogMeasurementState = { error: null };

export function MeasurementForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState(logMeasurement, initialState);

  return (
    <form action={formAction} className="measurement-form">
      <label className="set-field">
        <span>Date</span>
        <input type="date" name="measuredAt" defaultValue={today} max={today} required />
      </label>
      <div className="set-fields">
        <label className="set-field">
          <span>Weight (kg)</span>
          <input type="number" inputMode="decimal" name="weightKg" min={0} step={0.1} />
        </label>
        <label className="set-field">
          <span>Waist (cm)</span>
          <input type="number" inputMode="decimal" name="waistCm" min={0} step={0.1} />
        </label>
        <label className="set-field">
          <span>Chest (cm)</span>
          <input type="number" inputMode="decimal" name="chestCm" min={0} step={0.1} />
        </label>
      </div>
      {state.error ? <p className="error-message" role="alert">{state.error}</p> : null}
      <button type="submit" className="start-button" disabled={pending}>
        {pending ? "Saving…" : "Save measurement"}
      </button>
    </form>
  );
}
