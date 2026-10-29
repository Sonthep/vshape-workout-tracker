import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PhotoUploadForm } from "@/components/photo-upload-form";
import { deletePhoto } from "@/app/photos/actions";
import type { PhotoView } from "@/lib/progress/photos";
import { CameraIcon } from "@/components/icons";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { isoDateInTimeZone } from "@/lib/date";

const BUCKET = "progress-photos";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function todayIso(): string {
  return isoDateInTimeZone();
}

type PhotoRow = {
  id: string;
  taken_at: string;
  view: PhotoView;
  storage_path: string;
};

export default async function PhotosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("progress_photos")
    .select("id, taken_at, view, storage_path")
    .eq("user_id", user.id)
    .order("taken_at", { ascending: false });
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as PhotoRow[];
  const { data: signedUrls } = rows.length
    ? await supabase.storage
        .from(BUCKET)
        .createSignedUrls(rows.map((row) => row.storage_path), SIGNED_URL_TTL_SECONDS)
    : { data: [] };
  const signedUrlByPath = new Map((signedUrls ?? []).map((s) => [s.path, s.signedUrl]));
  const photos = rows.map((row) => ({ ...row, signedUrl: signedUrlByPath.get(row.storage_path) ?? null }));

  return (
    <main className="home-shell">
      <Link className="back-link" href="/">← Back to home</Link>
      <header className="home-header">
        <span className="eyebrow">PROGRESS</span>
        <h1 style={{ margin: "4px 0 8px" }}>Progress photos</h1>
        <p className="muted">Private to your account. Encrypted & never publicly accessible.</p>
      </header>

      <PhotoUploadForm today={todayIso()} />

      {photos.length === 0 ? (
        <div className="next-workout" style={{ textAlign: "center", padding: "30px 20px" }}>
          <div className="feature-icon-wrap photos-color" style={{ margin: "0 auto 12px", width: 44, height: 44 }}>
            <CameraIcon className="w-5 h-5" />
          </div>
          <h2 style={{ margin: "0 0 6px" }}>No photos uploaded yet</h2>
          <p className="muted">Upload front, side, and back physique photos to monitor your physical transformation.</p>
        </div>
      ) : (
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>YOUR GALLERY ({photos.length})</span>
          <ol className="photo-grid">
            {photos.map((photo) => (
              <li key={photo.id} className="photo-card">
                <div className="photo-thumb">
                  {photo.signedUrl ? (
                    <Image
                      src={photo.signedUrl}
                      alt={`${photo.view} view, ${formatDate(photo.taken_at)}`}
                      fill
                      sizes="160px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span className="photo-thumb-error">Unavailable</span>
                  )}
                </div>
                <div className="photo-meta">
                  <span className="photo-date">{formatDate(photo.taken_at)}</span>
                  <span className="photo-view">{photo.view}</span>
                </div>
                <form action={deletePhoto}>
                  <input type="hidden" name="photoId" value={photo.id} />
                  <ConfirmSubmitButton
                    className="photo-delete"
                    message="ลบรูปนี้ถาวรใช่ไหม? การดำเนินการนี้ย้อนกลับไม่ได้"
                  >
                    ลบรูป
                  </ConfirmSubmitButton>
                </form>
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}
