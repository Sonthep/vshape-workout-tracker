import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/login", requestUrl.origin));

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) return NextResponse.redirect(new URL("/login", requestUrl.origin));

  await supabase.from("profiles").upsert({ id: data.user.id }, { onConflict: "id" });
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
