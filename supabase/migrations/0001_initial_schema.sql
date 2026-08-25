create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exercises (
  id text primary key,
  name text not null,
  equipment text[] not null default '{}',
  primary_muscles text[] not null default '{}',
  cues text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_day smallint not null check (program_day between 1 and 4),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  notes text
);

create table public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_id text not null references public.exercises(id),
  position smallint not null,
  target_sets smallint not null check (target_sets > 0),
  target_rep_min smallint,
  target_rep_max smallint,
  target_seconds_min smallint,
  target_seconds_max smallint,
  unique(session_id, position)
);

create table public.set_logs (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid not null references public.workout_exercises(id) on delete cascade,
  set_number smallint not null check (set_number > 0),
  weight_kg numeric(6,2),
  reps smallint,
  duration_seconds smallint,
  rir smallint check (rir between 0 and 5),
  completed_at timestamptz,
  unique(workout_exercise_id, set_number)
);

create table public.body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  measured_at date not null default current_date,
  weight_kg numeric(6,2),
  waist_cm numeric(6,2),
  chest_cm numeric(6,2),
  notes text,
  unique(user_id, measured_at)
);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at date not null default current_date,
  view text not null check (view in ('front','side','back')),
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.set_logs enable row level security;
alter table public.body_measurements enable row level security;
alter table public.progress_photos enable row level security;

create policy "profiles_owner" on public.profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "sessions_owner" on public.workout_sessions
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "workout_exercises_owner" on public.workout_exercises
for all using (
  exists (select 1 from public.workout_sessions s where s.id = session_id and s.user_id = auth.uid())
) with check (
  exists (select 1 from public.workout_sessions s where s.id = session_id and s.user_id = auth.uid())
);

create policy "set_logs_owner" on public.set_logs
for all using (
  exists (
    select 1
    from public.workout_exercises we
    join public.workout_sessions s on s.id = we.session_id
    where we.id = workout_exercise_id and s.user_id = auth.uid()
  )
) with check (
  exists (
    select 1
    from public.workout_exercises we
    join public.workout_sessions s on s.id = we.session_id
    where we.id = workout_exercise_id and s.user_id = auth.uid()
  )
);

create policy "measurements_owner" on public.body_measurements
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "photos_owner" on public.progress_photos
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Exercise catalog is public read-only for authenticated users.
alter table public.exercises enable row level security;
create policy "exercise_catalog_read" on public.exercises
for select to authenticated using (true);
