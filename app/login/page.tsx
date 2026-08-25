"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage(null);
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setErrorMessage(error?.message ?? null);
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="login-heading">
        <p className="eyebrow">V-SHAPE</p>
        <h1 id="login-heading">Sign in to train</h1>
        <p className="muted">We’ll email you a secure sign-in link. No password needed.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
          <button type="submit" className="start-button">Email me a sign-in link</button>
        </form>
        {status === "sent" ? <p className="status-message" role="status">Check your inbox for the sign-in link.</p> : null}
        {status === "error" ? <p className="error-message" role="alert">{errorMessage ?? "We couldn’t send that link. Please try again."}</p> : null}
      </section>
    </main>
  );
}
