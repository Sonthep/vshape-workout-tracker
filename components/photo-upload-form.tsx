"use client";

import { useActionState } from "react";
import { uploadPhoto, type UploadPhotoState } from "@/app/photos/actions";

const initialState: UploadPhotoState = { error: null };

export function PhotoUploadForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState(uploadPhoto, initialState);

  return (
    <form action={formAction} className="photo-upload-form">
      <label className="set-field">
        <span>Date</span>
        <input type="date" name="takenAt" defaultValue={today} max={today} required />
      </label>
      <label className="set-field">
        <span>View</span>
        <select name="view" defaultValue="front" required>
          <option value="front">Front</option>
          <option value="side">Side</option>
          <option value="back">Back</option>
        </select>
      </label>
      <label className="set-field">
        <span>Photo</span>
        <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" required />
      </label>
      {state.error ? <p className="error-message" role="alert">{state.error}</p> : null}
      <button type="submit" className="start-button" disabled={pending}>
        {pending ? "Uploading…" : "Upload photo"}
      </button>
    </form>
  );
}
