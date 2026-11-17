"use client";

import React, { useState } from "react";
import ParticleCanvas from "./ParticleCanvas";
import {
  WindIcon,
  ArrowUpRightIcon,
  ActivityIcon,
  ShieldAlertIcon,
  GaugeIcon,
  LayersIcon,
} from "./Icons";

export default function HeroSection() {
  const [heroAqi, setHeroAqi] = useState<number>(68);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden border-b border-slate-800/80 bg-slate-950">
      {/* Background Interactive Particle Simulation */}
      <ParticleCanvas aqi={heroAqi} className="opacity-75" />

      {/* Atmospheric radial ambient light gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[400px] bg-teal-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.12)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Atmospheric Surveillance System • WHO 2021 Metrology</span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          The Invisible Architecture of{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
            Urban Air Quality.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          Deciphering micro-particulate dispersion, street canyon vortex trapping,
          and photochemical smog dynamics across the world&apos;s densest metropolitan
          canopies in real-time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <a
            href="#simulator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-sm font-semibold transition-all duration-200 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] group active:scale-95"
          >
            <span>Launch Interactive Simulator</span>
            <ArrowUpRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#pollutants"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 font-mono text-sm transition-all duration-200 hover:border-slate-600"
          >
            <LayersIcon className="w-4 h-4 text-emerald-400" />
            <span>Pollutant Spectral Matrix</span>
          </a>
        </div>

        {/* Interactive Quick Particle Mood Toggle */}
        <div className="w-full max-w-xl mx-auto mb-14 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <WindIcon className="w-4 h-4 text-emerald-400" />
              Ambient Particulate Atmosphere:
            </span>
            <span className="text-emerald-400 font-semibold uppercase">
              {heroAqi <= 50
                ? "Pristine Basin (AQI " + heroAqi + ")"
                : heroAqi <= 100
                ? "Moderate Canopy (AQI " + heroAqi + ")"
                : heroAqi <= 170
                ? "Unhealthy Smog (AQI " + heroAqi + ")"
                : "Severe Inversion (AQI " + heroAqi + ")"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">Clean</span>
            <input
              type="range"
              min="15"
              max="280"
              value={heroAqi}
              onChange={(e) => setHeroAqi(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <span className="text-[11px] font-mono text-slate-400">Smog</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono text-left">
            Drag slider to perturb atmospheric particle density and color in real time.
          </p>
        </div>

        {/* 4 HUD KPI Telemetry Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Non-Compliance Rate
              </span>
              <ShieldAlertIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight mb-1">
              99.1%
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              Global urban populace breathing air above WHO annual PM2.5 guidelines (5 µg/m³).
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span>WHO Threshold</span>
              <span>5.0 µg/m³ Max</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Premature Mortality
              </span>
              <ActivityIcon className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight mb-1">
              6.7M
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              Annual deaths globally linked to combined outdoor and domestic air pollution exposure.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-rose-400">
              <span>Cardiovascular Burden</span>
              <span>38% Stroke/Ischemia</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Aerodynamic Cutoff
              </span>
              <GaugeIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight mb-1">
              2.5 µm
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              Sub-micron threshold allowing particles to bypass tracheal cilia and cross alveolar barriers.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span>Cellular Translocation</span>
              <span>Blood-Brain Crossing</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Canyon Stagnation
              </span>
              <LayersIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight mb-1">
              4.2×
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              Exhaust concentration amplification trapped in high-aspect-ratio urban street canyons.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span>Vortex Retention</span>
              <span>Pedestrian Inhalation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
