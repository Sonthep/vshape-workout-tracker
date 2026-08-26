insert into storage.buckets (id, name, public)
values ('progress-photos', 'progress-photos', false)
on conflict (id) do nothing;

-- Objects are stored under `{user_id}/...`; these policies scope every
-- operation to the folder matching the caller's own auth.uid().
create policy "progress_photos_select_own" on storage.objects
for select to authenticated
using (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "progress_photos_insert_own" on storage.objects
for insert to authenticated
with check (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "progress_photos_delete_own" on storage.objects
for delete to authenticated
using (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);
