"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../lib/supabaseClient";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isLogin = mode === "login";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await supabaseClient.auth.signInWithPassword(
          { email, password }
        );
        if (signInError) throw signInError;
        router.push("/notes");
      } else {
        const { data, error: signUpError } = await supabaseClient.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;

        if (data.session) {
          router.push("/notes");
        } else {
          setSuccess("Check your inbox — we sent you a confirmation email.");
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-xl bg-white border border-slate-200 p-6 shadow-md"
    >
      <h1 className="text-xl font-semibold text-slate-900">
        {isLogin ? "Welcome back" : "Create your account"}
      </h1>
      <p className="text-sm text-slate-500">
        {isLogin
          ? "Sign in with your email to access your notes."
          : "Sign up with your email to start creating notes."}
      </p>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          {success}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none ring-0 focus:border-slate-600"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none ring-0 focus:border-slate-600"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (isLogin ? "Signing in..." : "Creating account...") : isLogin ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
}

