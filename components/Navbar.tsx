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
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-transparent border-b border-slate-200/60 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:border-emerald-400 transition-all duration-300 shadow-sm">
            <WindIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-base text-slate-900 font-mono uppercase">
                Aerolytics
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold">
                PRO v4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono tracking-tight hidden sm:block">
              Urban Atmospheric Observatory
            </p>
          </div>
        </a>

        {/* Live Network & Clock HUD */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-slate-800 font-medium">4,892 SENSORS ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <ActivityIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>LATENCY: 42ms</span>
          </div>
          <div className="text-slate-700 font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-medium">
            {time || "--:--:-- UTC"}
          </div>
        </div>

        {/* Navigation & Action */}
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-5 text-xs uppercase tracking-wider font-mono text-slate-600">
            <a
              href="#simulator"
              className="hover:text-emerald-600 transition-colors py-1 font-medium"
            >
              Simulator
            </a>
            <a
              href="#pollutants"
              className="hover:text-emerald-600 transition-colors py-1 font-medium"
            >
              Pollutants
            </a>
            <a
              href="#anatomy"
              className="hover:text-emerald-600 transition-colors py-1 font-medium"
            >
              Canyon Dynamics
            </a>
            <a
              href="#metrology"
              className="hover:text-emerald-600 transition-colors py-1 font-medium"
            >
              Metrology
            </a>
            <a
              href="#solutions"
              className="hover:text-emerald-600 transition-colors py-1 font-medium"
            >
              Interventions
            </a>
          </div>

          <a
            href="#simulator"
            className="text-xs uppercase tracking-wider font-mono font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            Launch Lab
          </a>
        </nav>
      </div>
    </header>
  );
}
