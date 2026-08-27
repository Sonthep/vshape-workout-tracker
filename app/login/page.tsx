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
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span className="brand-badge" style={{ width: 34, height: 34, fontSize: "1.2rem" }}>V</span>
          <div>
            <span className="eyebrow" style={{ fontSize: "0.68rem" }}>V-SHAPE PROGRAM</span>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#ffffff" }}>WORKOUT TRACKER</div>
          </div>
        </div>

        <h1 id="login-heading" style={{ fontSize: "1.75rem", margin: "14px 0 6px" }}>
          {mode === "signin" ? "Sign in to train" : "Create your account"}
        </h1>
        <p className="muted">
          {mode === "signin" ? "Enter your credentials to continue tracking your workouts." : "Pick a secure password to start your 4-day V-shape transformation."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
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
          </div>

          <div>
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
          </div>

          <button type="submit" className="start-button" disabled={status === "loading"}>
            {status === "loading" ? "Processing…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        {status === "info" ? <p className="status-message" role="status">{message}</p> : null}
        {status === "error" ? <p className="error-message" role="alert">{message}</p> : null}

        <button type="button" className="auth-switch" onClick={toggleMode}>
          {mode === "signin" ? "New here? Create an account →" : "Already have an account? Sign in →"}
        </button>
      </section>
    </main>
  );
}
