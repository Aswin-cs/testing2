"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  ShieldCheckIcon,
  ActivityIcon,
  WindIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ZapIcon,
} from "./Icons";

export default function HighSubmittedContainer() {
  const { data: session, status } = useSession();
  const [submissionCount, setSubmissionCount] = useState<number>(3);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<string>("Just now");

  if (status !== "authenticated" || !session?.user) {
    return null;
  }

  const handleNewSubmission = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmissionCount((prev) => prev + 1);
      setLastSubmissionTime("Just now");
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      {/* Box of container with title "high submitted" */}
      <div className="bg-white border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-emerald-500/10 relative overflow-hidden transition-all duration-300">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10">
          {/* Container Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    high submitted
                  </h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold uppercase">
                    Authenticated Node
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  High-Priority Atmospheric Observation Telemetry • Ingestion Verified
                </p>
              </div>
            </div>

            {/* Quick Action */}
            <button
              onClick={handleNewSubmission}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition-all duration-200 shadow-sm disabled:opacity-50"
            >
              <ZapIcon className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Transmitting..." : "Submit New High Observation"}</span>
            </button>
          </div>

          {/* User & Telemetry Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-500 block mb-1 font-semibold">
                Authenticated Observer
              </span>
              <div className="font-bold text-slate-900 text-sm truncate">
                {session.user.name || "Citizen Observer"}
              </div>
              <div className="text-[11px] font-mono text-slate-500 truncate">
                {session.user.email}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-500 block mb-1 font-semibold">
                Observation Submissions
              </span>
              <div className="text-2xl font-black font-mono text-emerald-700">
                {submissionCount} Record{submissionCount > 1 ? "s" : ""}
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Status: Ingestion Approved
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-500 block mb-1 font-semibold">
                Cryptographic Telemetry Hash
              </span>
              <div className="text-xs font-mono text-slate-800 font-bold truncate">
                SHA-256: 9b2d8f4c...e71a
              </div>
              <div className="text-[11px] font-mono text-emerald-700 font-medium">
                Last broadcast: {lastSubmissionTime}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-500 block mb-1 font-semibold">
                Mesh Network Status
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Station Synchronized</span>
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Latency: 38ms P99
              </div>
            </div>
          </div>

          {/* Submitted Telemetry Activity Feed */}
          <div className="rounded-2xl bg-slate-50/70 border border-slate-200 p-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3 font-semibold">
              <span>Verified High Submissions Stream</span>
              <span>Classification: Critical Urban AQI</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <ActivityIcon className="w-3.5 h-3.5 text-rose-600" />
                  <span className="font-semibold text-slate-900">
                    High PM2.5 Inversion Spike Report
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    (Sensor Node #DEL-8820)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-rose-700 font-bold">298 µg/m³</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    SUBMITTED &amp; VERIFIED
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <WindIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-semibold text-slate-900">
                    Street Canyon Recirculation Plume
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    (Sensor Node #LDN-4412)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber-700 font-bold">64 µg/m³</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    SUBMITTED &amp; VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
