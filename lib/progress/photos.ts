export const PHOTO_VIEWS = ["front", "side", "back"] as const;
export type PhotoView = (typeof PHOTO_VIEWS)[number];

export function isValidPhotoView(value: string): value is PhotoView {
  return (PHOTO_VIEWS as readonly string[]).includes(value);
}

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export function validatePhotoFile(file: { type: string; size: number }): string | null {
  if (file.size === 0) return "Select a photo to upload.";
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return "Photo must be a JPEG, PNG, or WEBP image.";
  if (file.size > MAX_PHOTO_BYTES) return "Photo must be smaller than 8 MB.";
  return null;
}

function extensionForMimeType(mimeType: string): string {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "jpg";
}

/**
 * Storage objects live at `{userId}/...` so the bucket's RLS policies (which
 * key off `(storage.foldername(name))[1]`) can scope every read/write to the
 * caller's own folder — this path shape is not just a naming convention.
 */
export function buildPhotoStoragePath(
  userId: string,
  takenAt: string,
  view: PhotoView,
  mimeType: string,
  uniqueId: string,
): string {
  return `${userId}/${takenAt}-${view}-${uniqueId}.${extensionForMimeType(mimeType)}`;
}
