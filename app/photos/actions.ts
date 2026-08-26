"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidMeasurementDate } from "@/lib/progress/measurements";
import { buildPhotoStoragePath, isValidPhotoView, validatePhotoFile } from "@/lib/progress/photos";

const BUCKET = "progress-photos";

export type UploadPhotoState = { error: string | null };

export async function uploadPhoto(
  _prevState: UploadPhotoState,
  formData: FormData,
): Promise<UploadPhotoState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const takenAt = String(formData.get("takenAt"));
  const view = String(formData.get("view"));

  if (!isValidMeasurementDate(takenAt)) return { error: "Enter a valid date that isn't in the future." };
  if (!isValidPhotoView(view)) return { error: "Choose a front, side, or back view." };

  const file = formData.get("photo");
  if (!(file instanceof File)) return { error: "Select a photo to upload." };
  const fileError = validatePhotoFile(file);
  if (fileError) return { error: fileError };

  const storagePath = buildPhotoStoragePath(user.id, takenAt, view, file.type, randomUUID());

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, file, {
    contentType: file.type,
  });
  if (uploadError) return { error: uploadError.message };

  const { error: insertError } = await supabase
    .from("progress_photos")
    .insert({ user_id: user.id, taken_at: takenAt, view, storage_path: storagePath });

  if (insertError) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    return { error: insertError.message };
  }

  revalidatePath("/photos");
  return { error: null };
}

export async function deletePhoto(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const photoId = String(formData.get("photoId"));
  const storagePath = String(formData.get("storagePath"));

  const { error: deleteRowError } = await supabase
    .from("progress_photos")
    .delete()
    .eq("id", photoId)
    .eq("user_id", user.id);
  if (deleteRowError) throw new Error(deleteRowError.message);

  const { error: removeError } = await supabase.storage.from(BUCKET).remove([storagePath]);
  if (removeError) throw new Error(removeError.message);

  revalidatePath("/photos");
}
