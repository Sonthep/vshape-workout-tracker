import { describe, expect, it } from "vitest";
import { buildPhotoStoragePath, isValidPhotoView, validatePhotoFile } from "@/lib/progress/photos";

describe("isValidPhotoView", () => {
  it("accepts front, side, and back", () => {
    expect(isValidPhotoView("front")).toBe(true);
    expect(isValidPhotoView("side")).toBe(true);
    expect(isValidPhotoView("back")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isValidPhotoView("top")).toBe(false);
    expect(isValidPhotoView("")).toBe(false);
  });
});

describe("validatePhotoFile", () => {
  it("accepts a reasonably sized image", () => {
    expect(validatePhotoFile({ type: "image/jpeg", size: 1024 })).toBeNull();
  });

  it("rejects an empty file", () => {
    expect(validatePhotoFile({ type: "image/jpeg", size: 0 })).toBe("Select a photo to upload.");
  });

  it("rejects a disallowed file type", () => {
    expect(validatePhotoFile({ type: "application/pdf", size: 1024 })).toBe(
      "Photo must be a JPEG, PNG, or WEBP image.",
    );
  });

  it("rejects a file over the size limit", () => {
    expect(validatePhotoFile({ type: "image/png", size: 9 * 1024 * 1024 })).toBe(
      "Photo must be smaller than 8 MB.",
    );
  });
});

describe("buildPhotoStoragePath", () => {
  it("scopes the path under the user's own folder for storage RLS", () => {
    const path = buildPhotoStoragePath("user-123", "2026-08-26", "front", "image/jpeg", "abc");
    expect(path).toBe("user-123/2026-08-26-front-abc.jpg");
  });

  it("maps mime types to the matching extension", () => {
    expect(buildPhotoStoragePath("u", "2026-08-26", "side", "image/png", "id")).toMatch(/\.png$/);
    expect(buildPhotoStoragePath("u", "2026-08-26", "side", "image/webp", "id")).toMatch(/\.webp$/);
    expect(buildPhotoStoragePath("u", "2026-08-26", "side", "image/jpeg", "id")).toMatch(/\.jpg$/);
  });
});
