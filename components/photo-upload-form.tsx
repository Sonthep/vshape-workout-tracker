"use client";

import { useActionState } from "react";
import { uploadPhoto, type UploadPhotoState } from "@/app/photos/actions";
import { CameraIcon } from "@/components/icons";

const initialState: UploadPhotoState = { error: null };

export function PhotoUploadForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState(uploadPhoto, initialState);

  return (
    <form action={formAction} className="photo-upload-form">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div className="feature-icon-wrap photos-color" style={{ width: 28, height: 28 }}>
          <CameraIcon className="w-4 h-4" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#ffffff" }}>Upload Progress Photo</span>
      </div>

      <div className="set-fields">
        <label className="set-field">
          <span>Date</span>
          <input type="date" name="takenAt" defaultValue={today} max={today} required />
        </label>
        <label className="set-field">
          <span>View</span>
          <select name="view" defaultValue="front" required>
            <option value="front">Front View</option>
            <option value="side">Side View</option>
            <option value="back">Back View</option>
          </select>
        </label>
      </div>

      <label className="set-field">
        <span>Photo (JPG, PNG, WEBP)</span>
        <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" required />
      </label>

      {state.error ? <p className="error-message" role="alert">{state.error}</p> : null}
      <button type="submit" className="start-button" disabled={pending}>
        {pending ? "Uploading…" : "Upload photo"}
      </button>
    </form>
  );
}
