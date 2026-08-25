import type { WorkoutDay } from "@/lib/workouts/program";

export function WorkoutCard({ workout }: { workout: WorkoutDay }) {
  return (
    <article style={{ background: "var(--panel)", borderRadius: 0, padding: 20 }}>
      <p style={{ color: "var(--mute)", margin: 0, fontWeight: 700, fontSize: ".72rem", letterSpacing: ".05em", textTransform: "uppercase" }}>DAY {workout.day} · {workout.weekday}</p>
      <h2 style={{ margin: "8px 0" }}>{workout.titleTh}</h2>
      <p style={{ color: "var(--muted)" }}>{workout.exercises.length} exercises</p>
    </article>
  );
}
