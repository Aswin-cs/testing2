"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  WindIcon,
  ShieldCheckIcon,
  GoogleIcon,
} from "@/components/Icons";

function SignUpContent() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    oauthError === "OAuthSignin" || oauthError === "OAuthCallback"
      ? "Google enrollment failed. Please verify your Google credentials in .env.local."
      : null
  );

  const handleGoogleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "Unable to initiate Google registration.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/50 blur-[130px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center justify-center gap-3 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:border-emerald-300 transition-all">
            <WindIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-bold tracking-wider text-xl text-slate-900 font-mono uppercase">
            Aerolytics
          </span>
        </Link>

        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Observer Registration
        </h2>
        <p className="mt-2 text-xs font-mono text-slate-500 max-w-sm mx-auto">
          Enroll as a certified atmospheric data contributor and reporting node with your Google account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-3xl sm:px-10 text-center">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono text-left leading-relaxed">
              {error}
            </div>
          )}

          {/* Observer Node Enrollment HUD */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-left">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Observer Enrollment
              </div>
              <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                Instant Google Provisioning
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>One-Click</span>
            </div>
          </div>

          {/* Single Google OAuth Registration Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-2xl text-xs font-mono font-bold text-slate-800 shadow-2xs hover:shadow-sm transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span>{loading ? "Registering via Google..." : "Sign Up with Google"}</span>
          </button>

          <p className="mt-4 text-[11px] font-mono text-slate-400 leading-normal">
            No password or form required. Your profile and verified observer role are automatically initialized upon authorization.
          </p>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
            <span>Already registered?</span>
            <Link
              href="/auth/signin"
              className="font-bold text-emerald-700 hover:text-emerald-600 underline"
            >
              Sign In with Google
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
          <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Google OAuth 2.0 • Mongoose Schema Integration</span>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SignUpContent />
    </Suspense>
  );
}
