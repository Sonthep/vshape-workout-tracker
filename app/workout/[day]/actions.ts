"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { findOrCreateSession } from "@/lib/workouts/session";

export async function startSession(formData: FormData) {
  const day = Number(formData.get("day"));

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const session = await findOrCreateSession(supabase, user.id, day);
  redirect(`/session/${session.id}`);
}
