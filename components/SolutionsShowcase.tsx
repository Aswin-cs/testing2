"use client";

import React, { useState } from "react";
import {
  ZapIcon,
  ShieldCheckIcon,
  SlidersIcon,
  SparklesIcon,
  BarChart3Icon,
} from "./Icons";

export default function SolutionsShowcase() {
  const [lezCoverage, setLezCoverage] = useState<number>(65);
  const [canopyRatio, setCanopyRatio] = useState<number>(22);
  const [evPenetration, setEvPenetration] = useState<number>(45);

  const pm25Reduction = (
    lezCoverage * 0.28 +
    canopyRatio * 0.65 +
    evPenetration * 0.32
  ).toFixed(1);

  const noxReduction = (
    lezCoverage * 0.42 +
    evPenetration * 0.55 +
    canopyRatio * 0.15
  ).toFixed(1);

  const uhiCooling = (canopyRatio * 0.08 + lezCoverage * 0.015).toFixed(2);

  const hospitalAvoidance = Math.round(
    Number(pm25Reduction) * 142 + Number(noxReduction) * 88
  );

  return (
    <section id="solutions" className="py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 uppercase tracking-widest mb-3 font-semibold">
            <ZapIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Technological &amp; Policy Interventions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Metropolitan Mitigation Strategies
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Reversing urban atmospheric degradation requires an integrated combination of spatial
            geometry redesign, dynamic regulatory pricing, and advanced bio-aerosol filtration.
          </p>
        </div>

        {/* 4 Pillars of Mitigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 shadow-2xs">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider block mb-1 font-semibold">
              Regulatory Infrastructure
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Ultra Low Emission Zones (ULEZ)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamic geofenced congestion boundaries taxing Euro 4 petrol and Euro 6 diesel vehicles.
              Proven to slash central NO2 by 44% in metropolitan cores within 36 months.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-700 font-medium">
              Efficacy: <strong className="text-emerald-700 font-bold">-44% NO2 Plumes</strong>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-4 shadow-2xs">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-cyan-700 uppercase tracking-wider block mb-1 font-semibold">
              Photocatalysis
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              TiO₂ Reactive Facades
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nanocrystalline Titanium Dioxide surface coatings embedded in building concrete and
              asphalt. Solar UV photons catalyze the oxidation of toxic NOx into harmless water-soluble nitrates.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-700 font-medium">
              Efficacy: <strong className="text-cyan-700 font-bold">1m² clears 200m³ air/day</strong>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 mb-4 shadow-2xs">
              <ZapIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-teal-700 uppercase tracking-wider block mb-1 font-semibold">
              Hyperlocal Telemetry
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              IoT Micro-Sensor Meshes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Decentralized laser-scattering optical particle counters deployed on streetlights every
              100 meters. Provides instantaneous block-by-block exposure alerts for vulnerable citizens.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-700 font-medium">
              Resolution: <strong className="text-teal-700 font-bold">10m spatial / 5s cadence</strong>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 mb-4 shadow-2xs">
              <BarChart3Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-amber-800 uppercase tracking-wider block mb-1 font-semibold">
              Bio-Architecture
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Multi-Tier Bio-Shields
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evergreen hedges with high leaf area index (LAI) planted alongside vehicular carriage
              ways. Intercepts particulate resuspension directly at tailpipe height before sidewalk dispersal.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-700 font-medium">
              Efficacy: <strong className="text-amber-800 font-bold">30% to 55% PM Capture</strong>
            </div>
          </div>
        </div>

        {/* Interactive Urban Policy & Abatement Simulator */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-widest mb-1 font-semibold">
                <SlidersIcon className="w-4 h-4 text-emerald-600" />
                <span>Urban Intervention Impact Modeler</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Simulate Citywide Policy Levers
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-600 max-w-sm">
              Adjust regulatory intensity, urban forestry targets, and fleet transition to compute
              estimated particulate abatement and public health outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Slider 1: LEZ */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-800 font-semibold">
                    Low Emission Zone (LEZ) Urban Coverage
                  </span>
                  <span className="text-emerald-700 font-bold">{lezCoverage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lezCoverage}
                  onChange={(e) => setLezCoverage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 font-medium">
                  <span>0% (Unregulated)</span>
                  <span>50% (Core)</span>
                  <span>100% (Metropolitan Perimeter)</span>
                </div>
              </div>

              {/* Slider 2: Urban Canopy */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-800 font-semibold">
                    Urban Canopy &amp; Bioshield Coverage Ratio
                  </span>
                  <span className="text-teal-700 font-bold">{canopyRatio}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={canopyRatio}
                  onChange={(e) => setCanopyRatio(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 font-medium">
                  <span>5% (Sparse Concrete)</span>
                  <span>20% (Substantial)</span>
                  <span>40% (Garden City Standard)</span>
                </div>
              </div>

              {/* Slider 3: EV Fleet */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-800 font-semibold">
                    Zero-Emission Fleet Electrification
                  </span>
                  <span className="text-cyan-700 font-bold">{evPenetration}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={evPenetration}
                  onChange={(e) => setEvPenetration(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 font-medium">
                  <span>10% (Early Adoption)</span>
                  <span>50% (Mass Transition)</span>
                  <span>90% (Near Complete)</span>
                </div>
              </div>
            </div>

            {/* Results HUD Display (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left shadow-2xs">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                  PM2.5 Reduction
                </span>
                <div className="text-3xl font-black font-mono text-emerald-700 mb-1">
                  -{pm25Reduction}%
                </div>
                <p className="text-[11px] text-slate-600">
                  Estimated decrease in ambient fine particulate inhalation across street canyons.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left shadow-2xs">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                  NOx Reduction
                </span>
                <div className="text-3xl font-black font-mono text-cyan-700 mb-1">
                  -{noxReduction}%
                </div>
                <p className="text-[11px] text-slate-600">
                  Direct tailpipe reactive nitrogen gas mitigation and reduced ozone precursors.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left shadow-2xs">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                  UHI Thermal Relief
                </span>
                <div className="text-3xl font-black font-mono text-teal-700 mb-1">
                  -{uhiCooling}°C
                </div>
                <p className="text-[11px] text-slate-600">
                  Microclimate cooling from vegetative evapotranspiration and solar shading.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left shadow-2xs">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                  Avoided Admissions
                </span>
                <div className="text-3xl font-black font-mono text-amber-700 mb-1">
                  ~{hospitalAvoidance.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-600">
                  Estimated annual cardiac and acute asthma hospital admissions averted per million citizens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
