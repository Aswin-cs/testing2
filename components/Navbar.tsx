"use client";

import React, { useState, useEffect } from "react";
import { ActivityIcon, WindIcon } from "./Icons";

export default function Navbar() {
  const [time, setTime] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toISOString().slice(11, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-black/40 py-3"
          : "bg-transparent border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <WindIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-base text-white font-mono uppercase">
                Aerolytics
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                PRO v4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Urban Atmospheric Observatory
            </p>
          </div>
        </a>

        {/* Live Network & Clock HUD */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-slate-300 font-medium">4,892 SENSORS ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ActivityIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>LATENCY: 42ms</span>
          </div>
          <div className="text-slate-400 font-mono bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800/60">
            {time || "--:--:-- UTC"}
          </div>
        </div>

        {/* Navigation & Action */}
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-5 text-xs uppercase tracking-wider font-mono text-slate-300">
            <a
              href="#simulator"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Simulator
            </a>
            <a
              href="#pollutants"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Pollutants
            </a>
            <a
              href="#anatomy"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Canyon Dynamics
            </a>
            <a
              href="#metrology"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Metrology
            </a>
            <a
              href="#solutions"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Interventions
            </a>
          </div>

          <a
            href="#simulator"
            className="text-xs uppercase tracking-wider font-mono font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            Launch Lab
          </a>
        </nav>
      </div>
    </header>
  );
}
