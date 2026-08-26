import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PhotoUploadForm } from "@/components/photo-upload-form";
import { deletePhoto } from "@/app/photos/actions";
import type { PhotoView } from "@/lib/progress/photos";

const BUCKET = "progress-photos";
const SIGNED_URL_TTL_SECONDS = 60;

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
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
  const photos = await Promise.all(
    rows.map(async (row) => {
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(row.storage_path, SIGNED_URL_TTL_SECONDS);
      return { ...row, signedUrl: signed?.signedUrl ?? null };
    }),
  );

  return (
    <main className="home-shell">
      <Link className="back-link" href="/">← Back to home</Link>
      <header className="home-header">
        <p className="eyebrow">PROGRESS</p>
        <h1>Progress photos</h1>
        <p className="muted">Private to your account. Never publicly accessible.</p>
      </header>

      <PhotoUploadForm today={todayIso()} />

      {photos.length === 0 ? (
        <p className="muted">No photos yet.</p>
      ) : (
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
                <input type="hidden" name="storagePath" value={photo.storage_path} />
                <button type="submit" className="photo-delete">Delete</button>
              </form>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
