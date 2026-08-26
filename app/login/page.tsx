"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "info" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const supabase = createClient();
    const { data, error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
      setStatus("error");
      return;
    }

    if (mode === "signup" && !data.session) {
      setMessage("Account created. Check your inbox to confirm your email before signing in.");
      setStatus("info");
      return;
    }

    if (mode === "signup" && data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id }, { onConflict: "id" });
    }

    router.replace("/");
    router.refresh();
  }

  function toggleMode() {
    setMode((current) => (current === "signin" ? "signup" : "signin"));
    setMessage(null);
    setStatus("idle");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="login-heading">
        <p className="eyebrow">V-SHAPE</p>
        <h1 id="login-heading">{mode === "signin" ? "Sign in to train" : "Create your account"}</h1>
        <p className="muted">
          {mode === "signin" ? "Enter your email and password." : "Pick a password for your account."}
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            minLength={6}
            required
          />
          <button type="submit" className="start-button" disabled={status === "loading"}>
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        {status === "info" ? <p className="status-message" role="status">{message}</p> : null}
        {status === "error" ? <p className="error-message" role="alert">{message}</p> : null}
        <button type="button" className="auth-switch" onClick={toggleMode}>
          {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}
