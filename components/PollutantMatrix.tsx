"use client";

import React, { useState } from "react";
import {
  LayersIcon,
  ShieldAlertIcon,
  CpuIcon,
  BarChart3Icon,
  ActivityIcon,
} from "./Icons";

interface PollutantInfo {
  id: string;
  name: string;
  formula: string;
  category: string;
  diameter: string;
  residenceTime: string;
  whoLimit: string;
  usEpaLimit: string;
  primarySources: string[];
  physiologicalImpacts: string[];
  pathwayDepth: string;
  pathwayPercent: number;
  mechanisms: string;
}

const POLLUTANTS: PollutantInfo[] = [
  {
    id: "pm25",
    name: "Fine Particulate Matter",
    formula: "PM2.5",
    category: "Respirable Aerosol",
    diameter: "≤ 2.5 micrometers (µm)",
    residenceTime: "Days to Weeks (regional transport)",
    whoLimit: "5.0 µg/m³ annual mean",
    usEpaLimit: "9.0 µg/m³ annual mean",
    primarySources: [
      "Direct vehicle diesel/gasoline combustion exhaust",
      "Secondary aerosol synthesis from SO2 and NOx precursors",
      "Tire wear, brake pad friction, and asphalt resurfacing",
      "Biomass burning and domestic heating emissions",
    ],
    physiologicalImpacts: [
      "Deep alveolar deposition and capillary wall translocation",
      "Systemic vascular inflammation and arterial plaque rupture",
      "Ischemic heart disease, stroke, and chronic obstructive pulmonary disease",
      "Epigenetic alteration and microvascular dysfunction",
    ],
    pathwayDepth: "Alveolar Sacs & Capillary Bloodstream",
    pathwayPercent: 95,
    mechanisms:
      "Due to aerodynamic diameters below 2.5 micrometers, PM2.5 evades upper-airway ciliary clearance. Once reaching terminal alveolar clusters, insoluble carbonaceous cores induce oxidative stress cascades, releasing interleukin-6 and tumor necrosis factor-alpha into systemic circulation.",
  },
  {
    id: "pm10",
    name: "Coarse Inhalable Particulate",
    formula: "PM10",
    category: "Thoracic Aerosol",
    diameter: "≤ 10 micrometers (µm)",
    residenceTime: "Hours to Days (localized deposition)",
    whoLimit: "15.0 µg/m³ annual mean",
    usEpaLimit: "150.0 µg/m³ 24h mean",
    primarySources: [
      "Mechanical roadway attrition and resuspension",
      "Urban construction excavation and demolition debris",
      "Crustal dust storms and industrial mineral handling",
      "Agricultural tilling and surface wind abrasion",
    ],
    physiologicalImpacts: [
      "Tracheobronchial epithelial irritation and mucosal hyperplasia",
      "Exacerbation of asthma and chronic bronchitis episodes",
      "Reduced forced expiratory volume (FEV1)",
      "Heightened hospital admissions for respiratory distress",
    ],
    pathwayDepth: "Bronchial & Bronchiolar Airways",
    pathwayPercent: 65,
    mechanisms:
      "PM10 particles deposit predominantly along the conducting airways between the carina and segmental bronchi. Impaction at airway bifurcations activates bronchial macrophage phagocytosis and triggers localized goblet cell hypersecretion.",
  },
  {
    id: "no2",
    name: "Nitrogen Dioxide",
    formula: "NO₂",
    category: "Reactive Nitrogen Oxide",
    diameter: "Molecular (Gas Phase)",
    residenceTime: "1 to 2 Days (photochemical sink)",
    whoLimit: "10.0 µg/m³ annual mean",
    usEpaLimit: "100.0 µg/m³ 1-hour mean",
    primarySources: [
      "High-temperature internal combustion engines (vehicles)",
      "Thermal power generation and gas-fired turbines",
      "Industrial refining and chemical manufacturing plants",
      "Domestic gas stoves and unvented space heaters",
    ],
    physiologicalImpacts: [
      "Direct oxidation of surfactant proteins in terminal bronchioles",
      "Hyper-responsiveness to aeroallergens and bronchospasm",
      "Susceptibility to viral and bacterial pulmonary infections",
      "Pediatric asthma incidence acceleration in urban corridors",
    ],
    pathwayDepth: "Terminal Bronchioles & Alveolar Junctions",
    pathwayPercent: 78,
    mechanisms:
      "NO2 reacts rapidly with epithelial lining fluid (ELF), yielding nitric and nitrous acids that deplete localized antioxidant reserves (ascorbate, glutathione) and promote lipid peroxidation across pulmonary cell membranes.",
  },
  {
    id: "o3",
    name: "Tropospheric Ozone",
    formula: "O₃",
    category: "Photochemical Secondary Oxidant",
    diameter: "Molecular (Gas Phase)",
    residenceTime: "Hours to Days (sunlight dependent)",
    whoLimit: "60.0 µg/m³ 8-hour mean (peak season)",
    usEpaLimit: "70.0 ppb 8-hour standard",
    primarySources: [
      "Non-point secondary photochemical smog formation",
      "Reaction of NOx + Volatile Organic Compounds (VOCs) in UV",
      "Solvent evaporation, paint solvents, and fueling terminals",
      "Industrial chemical leakage under solar radiation",
    ],
    physiologicalImpacts: [
      "Acute pulmonary edema and reduced vital lung capacity",
      "Severe airway inflammation resembling chemical sunburn",
      "Exacerbation of emphysema and athletic performance decline",
      "Accelerated premature mortality during metropolitan heatwaves",
    ],
    pathwayDepth: "Deep Pulmonary Epithelium",
    pathwayPercent: 88,
    mechanisms:
      "Unlike stratospheric ozone which shields UV radiation, ground-level O3 is an aggressive oxidizing agent. It reacts with double bonds of polyunsaturated fatty acids in lung surfactant, initiating free-radical cascades and neurogenic airway constriction.",
  },
  {
    id: "co",
    name: "Carbon Monoxide",
    formula: "CO",
    category: "Asphyxiant Gas",
    diameter: "Molecular (Gas Phase)",
    residenceTime: "1 to 2 Months (global troposphere)",
    whoLimit: "4.0 mg/m³ 24-hour mean",
    usEpaLimit: "9.0 ppm 8-hour average",
    primarySources: [
      "Incomplete combustion in motor vehicle exhausts",
      "Poorly ventilated industrial heating appliances",
      "Wildfires, stubble burning, and municipal incinerators",
      "Defective domestic boilers and furnaces",
    ],
    physiologicalImpacts: [
      "High-affinity binding to hemoglobin yielding carboxyhemoglobin (COHb)",
      "Impairment of tissue oxygen delivery and cerebral hypoxia",
      "Myocardial ischemia, angina exacerbation, and arrhythmias",
      "Neurobehavioral deficits and acute perceptual deceleration",
    ],
    pathwayDepth: "Systemic Circulatory Transportation",
    pathwayPercent: 100,
    mechanisms:
      "Carbon monoxide binds to human hemoglobin with an affinity 210 times greater than oxygen, forming carboxyhemoglobin (COHb) and shifting the oxyhemoglobin dissociation curve to the left, suffocating myocardial and neural tissue at cellular levels.",
  },
  {
    id: "so2",
    name: "Sulfur Dioxide",
    formula: "SO₂",
    category: "Acidifying Precursor Gas",
    diameter: "Molecular (Gas Phase)",
    residenceTime: "1 to 4 Days (sulfate aerosol transformation)",
    whoLimit: "40.0 µg/m³ 24-hour mean",
    usEpaLimit: "75.0 ppb 1-hour standard",
    primarySources: [
      "Heavy fuel oil and diesel combustion in commercial marine vessels",
      "Coal-fired thermoelectric generating stations",
      "Metal smelting and petroleum distillation facilities",
      "Volcanic emissions and industrial sulfuric acid processing",
    ],
    physiologicalImpacts: [
      "Rapid reflex bronchoconstriction within 10 minutes of exposure",
      "Severe mucosal burning, anterior rhinorrhea, and coughing",
      "Acid rain precursor causing secondary sulfate aerosol creation",
      "High vulnerability among asthmatic children during exercise",
    ],
    pathwayDepth: "Upper Tracheobronchial Mucosa",
    pathwayPercent: 50,
    mechanisms:
      "Highly soluble in water, SO2 dissolves into the moist lining of upper respiratory passages, stimulating cholinergic irritant receptors in smooth muscle to cause instantaneous bronchospasm and wheezing.",
  },
];

export default function PollutantMatrix() {
  const [activeTab, setActiveTab] = useState<string>("pm25");
  const selected = POLLUTANTS.find((p) => p.id === activeTab) || POLLUTANTS[0];

  return (
    <section id="pollutants" className="py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 uppercase tracking-widest mb-3 font-semibold">
            <LayersIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chemical &amp; Particulate Speciation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Six Criteria Pollutants
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Atmospheric air pollution is not a singular substance, but a heterogeneous cocktail of
            aerodynamic particulates, combustion derivatives, and photochemical precursors.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {POLLUTANTS.map((pollutant) => {
            const isActive = pollutant.id === activeTab;
            return (
              <button
                key={pollutant.id}
                onClick={() => setActiveTab(pollutant.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 border shadow-sm ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20"
                    : "bg-slate-100/80 text-slate-700 border-slate-200 hover:bg-slate-200/60"
                }`}
              >
                <span className="mr-1.5 font-bold">{pollutant.formula}</span>
                <span className="hidden sm:inline opacity-85">
                  ({pollutant.name.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Pollutant Deep-Dive Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Top Info Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-extrabold text-emerald-700 font-mono">
                  {selected.formula}
                </span>
                <span className="text-xl font-bold text-slate-900">
                  {selected.name}
                </span>
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
                  {selected.category}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-600">
                Aerodynamic Profile: <span className="text-slate-900 font-semibold">{selected.diameter}</span> •
                Atmospheric Residence: <span className="text-slate-900 font-semibold">{selected.residenceTime}</span>
              </p>
            </div>

            {/* Threshold Standards Box */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-500 mb-0.5">WHO 2021 Guideline:</div>
                <div className="text-emerald-700 font-bold">{selected.whoLimit}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-500 mb-0.5">US EPA Standard:</div>
                <div className="text-cyan-700 font-bold">{selected.usEpaLimit}</div>
              </div>
            </div>
          </div>

          {/* Central Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Biological Pathway Depth & Particle Scale Visualizer (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Biological Inhalation Visualizer */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-3">
                  <span className="flex items-center gap-2 text-slate-800 font-semibold">
                    <ActivityIcon className="w-4 h-4 text-rose-600" />
                    Respiratory Penetration Depth
                  </span>
                  <span className="text-rose-700 font-bold">{selected.pathwayDepth}</span>
                </div>

                {/* Respiratory Tract Progression Meter */}
                <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">1. Nasopharynx (Upper Airways)</span>
                    <span className="text-slate-500 font-medium">Filtered</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">2. Trachea &amp; Main Bronchi</span>
                    <span className={selected.pathwayPercent >= 50 ? "text-amber-700 font-semibold" : "text-slate-400"}>
                      {selected.pathwayPercent >= 50 ? "Trapped / Irritated" : "Bypassed"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">3. Bronchioles</span>
                    <span className={selected.pathwayPercent >= 65 ? "text-orange-700 font-semibold" : "text-slate-400"}>
                      {selected.pathwayPercent >= 65 ? "Inflammation" : "Clear"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">4. Alveolar Gas Exchange Sacs</span>
                    <span className={selected.pathwayPercent >= 85 ? "text-rose-700 font-bold" : "text-slate-400"}>
                      {selected.pathwayPercent >= 85 ? "Translocation" : "Clear"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">5. Systemic Vascular Circulation</span>
                    <span className={selected.pathwayPercent >= 95 ? "text-red-700 font-bold" : "text-slate-400"}>
                      {selected.pathwayPercent >= 95 ? "Bloodstream Entry" : "None"}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 transition-all duration-500"
                      style={{ width: `${selected.pathwayPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Aerodynamic Particle Scale Diagram */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-mono text-slate-800 mb-3 flex items-center justify-between font-semibold">
                  <span>Relative Particle Scale Reference</span>
                  <span className="text-slate-500 font-normal">Geometric Micrometers</span>
                </div>
                <div className="relative w-full h-32 bg-slate-50 rounded-xl border border-slate-200 p-3 flex items-center justify-around overflow-hidden">
                  {/* Human Hair representation */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border border-dashed border-slate-400 bg-white flex items-center justify-center text-[10px] font-mono text-slate-600 font-medium">
                      70 µm
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 mt-1">Human Hair</span>
                  </div>

                  {/* PM10 representation */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-amber-400 bg-amber-100 flex items-center justify-center text-[9px] font-mono text-amber-800 font-bold">
                      10µm
                    </div>
                    <span className="text-[10px] font-mono text-amber-800 mt-1">PM10 (Pollen)</span>
                  </div>

                  {/* PM2.5 representation */}
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-sm" />
                    <span className="text-[10px] font-mono text-emerald-800 mt-2 font-bold">
                      2.5 µm (Soot)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pathophysiology & Sources (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Biochemical Mechanisms */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-800 mb-2 font-semibold">
                  <CpuIcon className="w-4 h-4 text-emerald-600" />
                  <span>Biochemical &amp; Cellular Toxicity Mechanism</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {selected.mechanisms}
                </p>
              </div>

              {/* Primary Sources & Health Impact in 2 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Emission Sources */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2 font-semibold">
                    <BarChart3Icon className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Urban Emission Vectors</span>
                  </div>
                  <ul className="space-y-2">
                    {selected.primarySources.map((src, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-700 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                        <span>{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinical & Epidemiological Outcomes */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2 font-semibold">
                    <ShieldAlertIcon className="w-3.5 h-3.5 text-rose-600" />
                    <span>Clinical Outcomes</span>
                  </div>
                  <ul className="space-y-2">
                    {selected.physiologicalImpacts.map((imp, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-700 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
