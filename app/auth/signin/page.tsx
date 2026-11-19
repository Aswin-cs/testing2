"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  WindIcon,
  LockIcon,
  MailIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  GoogleIcon,
  GitHubIcon,
} from "@/components/Icons";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    oauthError === "OAuthSignin" || oauthError === "OAuthCallback"
      ? "OAuth authentication failed. Verify OAuth credentials in .env.local."
      : null
  );
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setError(res.error || "Authentication failed");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setError(null);
    setOauthLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "OAuth provider connection failed");
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/50 blur-[130px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center gap-3 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs group-hover:border-emerald-300 transition-all">
            <WindIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-bold tracking-wider text-xl text-slate-900 font-mono uppercase">
            Aerolytics
          </span>
        </Link>

        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Citizen Observer Sign In
        </h2>
        <p className="mt-2 text-center text-xs font-mono text-slate-500">
          Access high-priority urban atmospheric telemetry &amp; reporting nodes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-3xl sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
              {error}
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              disabled={!!oauthLoading || loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-mono font-semibold text-slate-700 shadow-2xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>{oauthLoading === "google" ? "Connecting..." : "Google"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignIn("github")}
              disabled={!!oauthLoading || loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-mono font-semibold text-slate-700 shadow-2xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <GitHubIcon className="w-4 h-4 shrink-0 text-slate-900" />
              <span>{oauthLoading === "github" ? "Connecting..." : "GitHub"}</span>
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-white px-2.5 text-slate-400 font-semibold">
                Or access via credentials
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Station Observer Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MailIcon className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="observer@metrology.org"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Access Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <LockIcon className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !!oauthLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-sm text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none transition-all disabled:opacity-60 active:scale-95 cursor-pointer"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Terminal"}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-mono">
              Do not have an atmospheric observer account?{" "}
              <Link
                href="/auth/signup"
                className="font-bold text-emerald-700 hover:text-emerald-600 ml-1 underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
          <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>NextAuth OAuth &amp; JWT • Mongoose Verified</span>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SignInContent />
    </Suspense>
  );
}
