-- Only one unfinished session is allowed for a user and program day. This
-- closes the race between the read and insert in findOrCreateSession.
create unique index workout_sessions_one_active_per_day
on public.workout_sessions (user_id, program_day)
where completed_at is null;

alter table public.set_logs
  add constraint set_logs_weight_nonnegative check (weight_kg is null or weight_kg >= 0),
  add constraint set_logs_reps_positive check (reps is null or reps > 0),
  add constraint set_logs_duration_positive check (duration_seconds is null or duration_seconds > 0);
