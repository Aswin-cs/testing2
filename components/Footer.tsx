"use client";

import React from "react";
import { WindIcon, ShieldCheckIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs font-mono py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <WindIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-wider uppercase font-mono">
                Aerolytics Platform
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Global atmospheric surveillance architecture dedicated to continuous micro-particulate
              telemetry, aerodynamic urban canyon modeling, and empirical epidemiological risk calculation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              <span>Calibrated against Federal Equivalent Methods (FEM BAM-1020)</span>
            </div>
          </div>

          {/* Standards & Guidelines (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-white uppercase font-bold tracking-widest text-[11px] block mb-3">
              Regulatory Frameworks &amp; Baselines
            </span>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>• WHO Global Air Quality Guidelines (2021 Update)</li>
              <li>• US EPA National Ambient Air Quality Standards (NAAQS)</li>
              <li>• EU Ambient Air Quality Directive (2008/50/EC &amp; 2024 Revisions)</li>
              <li>• Copernicus Atmosphere Monitoring Service (Sentinel-5P TROPOMI)</li>
            </ul>
          </div>

          {/* Telemetry Stream Specifications (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-white uppercase font-bold tracking-widest text-[11px] block mb-3">
              Telemetry Telemetry Specs
            </span>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div>Network Nodes: <span className="text-white">4,892 Active</span></div>
              <div>Sampling Frequency: <span className="text-white">1.0 Hz Optic</span></div>
              <div>Packet Latency: <span className="text-white">&lt; 45ms P99</span></div>
              <div>Encryption: <span className="text-white">mTLS / SHA-256</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2026 Aerolytics Atmospheric Intelligence. All rights reserved. Zero emoji protocol enforced.
          </div>
          <button
            onClick={scrollToTop}
            className="hover:text-emerald-400 transition-colors uppercase tracking-widest text-slate-400"
          >
            [ Back to Top ]
          </button>
        </div>
      </div>
    </footer>
  );
}
