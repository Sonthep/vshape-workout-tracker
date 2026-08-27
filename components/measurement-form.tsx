"use client";

import { useActionState } from "react";
import { logMeasurement, type LogMeasurementState } from "@/app/progress/actions";
import { ChartIcon } from "@/components/icons";

const initialState: LogMeasurementState = { error: null };

export function MeasurementForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState(logMeasurement, initialState);

  return (
    <form action={formAction} className="measurement-form">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div className="feature-icon-wrap" style={{ width: 28, height: 28, background: "rgba(167, 139, 250, 0.15)", color: "var(--accent-purple)" }}>
          <ChartIcon className="w-4 h-4" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#ffffff" }}>Log New Measurement</span>
      </div>

      <label className="set-field">
        <span>Date</span>
        <input type="date" name="measuredAt" defaultValue={today} max={today} required />
      </label>

      <div className="set-fields">
        <label className="set-field">
          <span>Weight (kg)</span>
          <input type="number" inputMode="decimal" name="weightKg" min={0} step={0.1} placeholder="70.0" />
        </label>
        <label className="set-field">
          <span>Waist (cm)</span>
          <input type="number" inputMode="decimal" name="waistCm" min={0} step={0.1} placeholder="80.0" />
        </label>
        <label className="set-field">
          <span>Chest (cm)</span>
          <input type="number" inputMode="decimal" name="chestCm" min={0} step={0.1} placeholder="98.0" />
        </label>
      </div>

      {state.error ? <p className="error-message" role="alert">{state.error}</p> : null}
      <button type="submit" className="start-button" disabled={pending}>
        {pending ? "Saving…" : "Save measurement"}
      </button>
    </form>
  );
}
