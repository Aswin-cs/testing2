"use client";

import React, { useState } from "react";
import {
  BuildingIcon,
  WindIcon,
  LayersIcon,
} from "./Icons";

interface AnatomyLayer {
  id: string;
  title: string;
  subtitle: string;
  icon: "canyon" | "inversion" | "uhi" | "canopy" | "corridor";
  trappingFactor: string;
  altitudeRange: string;
  description: string;
  aerodynamicPhysics: string;
  architecturalIntervention: string;
}

const LAYERS: AnatomyLayer[] = [
  {
    id: "canyon",
    title: "Street Canyon Vortex",
    subtitle: "Aerodynamic Recirculation Cavity",
    icon: "canyon",
    trappingFactor: "3.5× to 5.2× Ambient",
    altitudeRange: "0m – 35m (Pedestrian Breathing Zone)",
    description:
      "When prevailing perpendicular winds strike tall street facades, skimming flow generates a primary recirculating vortex inside the canyon. Exhaust released from ground traffic is driven toward the leeward building facade and recirculated continuously rather than dispersed.",
    aerodynamicPhysics:
      "For canyons with aspect ratios (Height/Width) greater than 1.5, skimming flow regime isolates the street cavity from the upper boundary layer, severely suppressing turbulent kinetic energy dissipation.",
    architecturalIntervention:
      "Implement building setbacks, stepped podiums, permeable ground-level arcades, and varied roofline geometries to induce vertical wind entrainment.",
  },
  {
    id: "inversion",
    title: "Nocturnal Thermal Inversion",
    subtitle: "Planetary Boundary Layer Lid",
    icon: "inversion",
    trappingFactor: "Up to 8.0× Ambient",
    altitudeRange: "50m – 400m AGL (Atmospheric Cap)",
    description:
      "During clear winter nights, rapid terrestrial radiative cooling produces a cold air blanket near the asphalt surface while warmer air sits aloft. This creates a hydrostatic temperature inversion that completely caps convective vertical mixing.",
    aerodynamicPhysics:
      "A strongly positive lapse rate (dT/dz > 0) creates static atmospheric stability with Richardson numbers exceeding critical thresholds, freezing aerosol buoyant dispersion.",
    architecturalIntervention:
      "Establish high-elevation microclimate sensors, implement targeted regional emission shutdowns during forecasted inversion events, and cool urban heat traps.",
  },
  {
    id: "uhi",
    title: "Urban Heat Island (UHI) Dome",
    subtitle: "Convective Asphalt Updrafts",
    icon: "uhi",
    trappingFactor: "2.0× Precursor Synthesis",
    altitudeRange: "0m – 150m (Metropolitan Core)",
    description:
      "Extensive impervious concrete and bitumen surfaces absorb high solar insolation, re-radiating sensible heat at dusk. This elevated thermal baseline accelerates volatile organic compound (VOC) vapor pressure and photochemical ozone formation.",
    aerodynamicPhysics:
      "Differential thermal buoyancy creates localized convergent low-pressure cells that suck suburban peripheral air pollutants inward toward downtown commercial centers.",
    architecturalIntervention:
      "Mandate cool roofs (solar reflectance > 0.70), permeable reactive pavements, high-albedo coatings, and vertical vegetated living facades.",
  },
  {
    id: "canopy",
    title: "Green Canopy Bio-Filtration",
    subtitle: "Aerodynamic Particle Capture",
    icon: "canopy",
    trappingFactor: "35% – 55% Particulate Removal",
    altitudeRange: "2m – 18m (Canopy Stratum)",
    description:
      "Strategically structured urban forests and vegetative hedges act as living aerosol porous barriers. Foliage surface micro-roughness, trichomes, and wax layers facilitate inertial impaction, interception, and sedimentation of airborne micro-particles.",
    aerodynamicPhysics:
      "Aerosol deposition velocity (Vd) increases by up to 10-fold over rough leaf surfaces compared to smooth concrete, capturing significant fractions of PM2.5 and PM10.",
    architecturalIntervention:
      "Plant dense evergreen hedge rows between pedestrian sidewalks and vehicular carriage ways to intercept tailpipe emissions before inhalation.",
  },
  {
    id: "corridor",
    title: "Synoptic Ventilation Breezeways",
    subtitle: "Metropolitan Fluvial Corridors",
    icon: "corridor",
    trappingFactor: "Flushing Efficiency +65%",
    altitudeRange: "Ground Level to 80m",
    description:
      "Preserving unbroken linear open-space corridors along rivers, broad boulevards, and low-density transit tracks channels regional synoptic winds into the heart of the metropolis, regularly flushing stagnant aerosol pockets.",
    aerodynamicPhysics:
      "Maximizes pressure-driven volumetric airflow exchange rates (Q = A * V) through the urban canopy, reducing pollutant half-life in dense urban cores.",
    architecturalIntervention:
      "Zoning mandates prohibiting high-rise cross-walls that sever natural valley or maritime breeze axes, enforcing minimum 45m corridor widths.",
  },
];

export default function UrbanAnatomy() {
  const [activeLayer, setActiveLayer] = useState<AnatomyLayer>(LAYERS[0]);

  return (
    <section id="anatomy" className="py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 uppercase tracking-widest mb-3 font-semibold">
            <BuildingIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Micro-Meteorology &amp; Urban Morphology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Anatomy of the Urban Air Trap
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Metropolitan architecture does not merely occupy space; it actively dictates aerodynamic
            vortex formation, thermal stratification, and the inhalation risks of millions of pedestrians.
          </p>
        </div>

        {/* 2-Column Interactive Anatomy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Architectural Schematic (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs font-mono text-slate-500 font-semibold">
              <span className="uppercase tracking-widest">
                Aerodynamic Cross-Section Diagram
              </span>
              <span className="text-emerald-700">Layer: {activeLayer.title}</span>
            </div>

            {/* Visual Canyon Simulation */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-100 rounded-2xl border border-slate-200 p-4 overflow-hidden flex flex-col justify-end">
              {/* Sky / Atmospheric Boundary */}
              <div
                className={`absolute top-0 left-0 right-0 h-28 transition-all duration-500 ${
                  activeLayer.id === "inversion"
                    ? "bg-gradient-to-b from-rose-200/60 via-amber-100/50 to-transparent"
                    : "bg-gradient-to-b from-sky-100/70 to-transparent"
                }`}
              >
                {/* Wind vector streams */}
                <div className="absolute top-4 left-6 flex items-center gap-3 text-sky-800 font-mono text-[11px] font-semibold animate-pulse">
                  <WindIcon className="w-4 h-4" />
                  <span>Synoptic Boundary Layer Flow (U_inf = 5.2 m/s)</span>
                </div>
              </div>

              {/* Inversion Cap indicator if active */}
              {activeLayer.id === "inversion" && (
                <div className="absolute top-24 left-0 right-0 border-b-2 border-dashed border-rose-500 bg-rose-100/90 py-1 px-4 text-rose-800 font-mono text-xs flex justify-between items-center font-bold">
                  <span>Thermal Inversion Cap (dT/dz &gt; 0)</span>
                  <span>Convective Mixing Frozen</span>
                </div>
              )}

              {/* Street Canyon Visual Representation */}
              <div className="relative z-10 w-full flex items-end justify-between px-2 sm:px-6">
                {/* Leeward Building (Left) */}
                <div className="w-24 sm:w-28 h-56 bg-slate-200 border border-slate-300 rounded-t-lg relative flex flex-col justify-between p-2 shadow-sm">
                  <div className="text-[10px] font-mono text-slate-600 font-bold text-center">
                    Leeward High-Rise (H)
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 opacity-90">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 rounded-sm border ${
                          activeLayer.id === "canyon"
                            ? "bg-amber-200 border-amber-400"
                            : "bg-white border-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-amber-800 font-bold text-center">
                    Pollutant Trapping
                  </div>
                </div>

                {/* Canyon Interior: Air Vortex Flow & Tailpipe emission */}
                <div className="flex-1 h-56 flex flex-col justify-end items-center relative px-2">
                  {/* Canyon Airflow Vortex */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-28 h-28 rounded-full border-2 border-dashed transition-all duration-700 flex items-center justify-center ${
                        activeLayer.id === "canyon"
                          ? "border-amber-600 bg-amber-50/70 animate-spin opacity-95 scale-110"
                          : activeLayer.id === "corridor"
                          ? "border-emerald-600 bg-emerald-50/50 opacity-90"
                          : "border-slate-400 opacity-50"
                      }`}
                    >
                      <div className="text-[9px] font-mono text-center font-bold text-slate-800">
                        Recirculating
                        <br />
                        Helical Vortex
                      </div>
                    </div>
                  </div>

                  {/* Ground Traffic & Bio-hedge */}
                  <div className="relative z-20 w-full flex items-center justify-between pb-1 border-b-2 border-slate-300">
                    <div className="text-[10px] font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-300 font-semibold shadow-2xs">
                      Tailpipe PM2.5 / NOx
                    </div>

                    {activeLayer.id === "canopy" && (
                      <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-400 font-bold animate-bounce shadow-2xs">
                        Bio-Filter Hedge (Vd = 1.2 cm/s)
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 py-1 font-medium">
                    Street Width (W = 20m) • Aspect Ratio: 1.8
                  </div>
                </div>

                {/* Windward Building (Right) */}
                <div className="w-24 sm:w-28 h-56 bg-slate-200 border border-slate-300 rounded-t-lg relative flex flex-col justify-between p-2 shadow-sm">
                  <div className="text-[10px] font-mono text-slate-600 font-bold text-center">
                    Windward Facade (H)
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 opacity-90">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-4 rounded-sm bg-white border border-slate-300"
                      />
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-cyan-800 font-bold text-center">
                    Downward Deflection
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500 font-medium">
              <span>Aspect Ratio: H/W &gt; 1.5 (Skimming Regime)</span>
              <span className="text-emerald-700 font-semibold">Click right layers to switch</span>
            </div>
          </div>

          {/* Right Column: Layer Selector & Technical Explanations (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {LAYERS.map((layer) => {
              const isSelected = layer.id === activeLayer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 shadow-2xs ${
                    isSelected
                      ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <LayersIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{layer.title}</h3>
                        <p className="text-[11px] font-mono text-slate-500">
                          {layer.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-700 font-bold block">
                        {layer.trappingFactor}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {layer.altitudeRange.split("(")[0]}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-fadeIn">
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        {layer.description}
                      </p>

                      <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs">
                        <span className="text-sky-900 font-mono block font-bold mb-1">
                          Fluid Dynamics &amp; Physics:
                        </span>
                        <p className="text-sky-800 text-[11px] leading-relaxed">
                          {layer.aerodynamicPhysics}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                        <span className="text-emerald-900 font-mono block font-bold mb-1">
                          Remedial Architecture &amp; Planning:
                        </span>
                        <p className="text-emerald-800 text-[11px] leading-relaxed">
                          {layer.architecturalIntervention}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
