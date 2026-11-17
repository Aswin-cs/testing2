"use client";

import React, { useState } from "react";
import {
  GaugeIcon,
  WindIcon,
  ThermometerIcon,
  DropletsIcon,
  CompassIcon,
  ShieldCheckIcon,
  ShieldAlertIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  SlidersIcon,
} from "./Icons";

interface CityData {
  name: string;
  country: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  co: number;
  so2: number;
  temp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  status: string;
}

const CITIES: CityData[] = [
  {
    name: "Zurich",
    country: "Switzerland",
    aqi: 24,
    pm25: 5.8,
    pm10: 9.4,
    no2: 12.1,
    o3: 34.0,
    co: 0.28,
    so2: 1.1,
    temp: 14,
    humidity: 58,
    windSpeed: 12.4,
    pressure: 1018,
    status: "Pristine Alpine Baseline",
  },
  {
    name: "Tokyo",
    country: "Japan",
    aqi: 38,
    pm25: 9.2,
    pm10: 17.5,
    no2: 24.3,
    o3: 41.2,
    co: 0.42,
    so2: 2.3,
    temp: 19,
    humidity: 62,
    windSpeed: 16.8,
    pressure: 1014,
    status: "Clean Coastal Ventilation",
  },
  {
    name: "London",
    country: "United Kingdom",
    aqi: 64,
    pm25: 18.6,
    pm10: 29.2,
    no2: 43.8,
    o3: 32.5,
    co: 0.64,
    so2: 3.4,
    temp: 12,
    humidity: 78,
    windSpeed: 14.2,
    pressure: 1012,
    status: "Moderate Canyon Plume",
  },
  {
    name: "New York",
    country: "United States",
    aqi: 72,
    pm25: 22.4,
    pm10: 36.1,
    no2: 49.0,
    o3: 46.8,
    co: 0.75,
    so2: 4.2,
    temp: 18,
    humidity: 54,
    windSpeed: 11.5,
    pressure: 1016,
    status: "Moderate Arterial Traffic",
  },
  {
    name: "Seoul",
    country: "South Korea",
    aqi: 132,
    pm25: 48.0,
    pm10: 82.5,
    no2: 58.2,
    o3: 64.0,
    co: 1.15,
    so2: 7.1,
    temp: 16,
    humidity: 67,
    windSpeed: 7.2,
    pressure: 1020,
    status: "Sensitive Inversion Stagnation",
  },
  {
    name: "New Delhi",
    country: "India",
    aqi: 348,
    pm25: 298.5,
    pm10: 442.0,
    no2: 104.2,
    o3: 88.0,
    co: 3.65,
    so2: 19.8,
    temp: 26,
    humidity: 42,
    windSpeed: 3.8,
    pressure: 1008,
    status: "Severe Inversion Trapping",
  },
];

export default function AqiSimulator() {
  const [selectedCity, setSelectedCity] = useState<CityData>(CITIES[1]);
  const [customAqi, setCustomAqi] = useState<number>(38);
  const [manualOverride, setManualOverride] = useState<boolean>(false);

  const activeAqi = manualOverride ? customAqi : selectedCity.aqi;

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
    setCustomAqi(city.aqi);
    setManualOverride(false);
  };

  const handleSliderChange = (val: number) => {
    setCustomAqi(val);
    setManualOverride(true);
  };

  // Derive status details based on current AQI
  const getAqiDetails = (val: number) => {
    if (val <= 50) {
      return {
        label: "Good",
        subtitle: "Minimal Risk • Optimal Cellular Respiration",
        textColor: "text-emerald-400",
        borderColor: "border-emerald-500/40",
        bgColor: "bg-emerald-500/10",
        ringColor: "#10b981",
        guidance: "Air quality is considered satisfactory; atmospheric pollution poses negligible risk.",
        respirator: "Unrestricted outdoor ventilatory activity.",
        ventilation: "Full natural cross-ventilation encouraged.",
      };
    }
    if (val <= 100) {
      return {
        label: "Moderate",
        subtitle: "Acceptable • Minor Respiratory Irritation Potential",
        textColor: "text-amber-400",
        borderColor: "border-amber-500/40",
        bgColor: "bg-amber-500/10",
        ringColor: "#f59e0b",
        guidance: "Air quality is acceptable; unusually sensitive individuals may experience mild cough.",
        respirator: "Sensitive groups should limit prolonged heavy outdoor exertion.",
        ventilation: "Standard window ventilation; indoor HEPA optional.",
      };
    }
    if (val <= 150) {
      return {
        label: "Unhealthy for Sensitive Groups",
        subtitle: "Heightened Vulnerability • Micro-Particulate Stress",
        textColor: "text-orange-400",
        borderColor: "border-orange-500/40",
        bgColor: "bg-orange-500/10",
        ringColor: "#f97316",
        guidance: "Members of sensitive groups may experience physiological effects; general public is less affected.",
        respirator: "Sensitive groups should wear particulate filtering masks (KF94/FFP2).",
        ventilation: "Seal building envelopes; activate primary filtration systems.",
      };
    }
    if (val <= 200) {
      return {
        label: "Unhealthy",
        subtitle: "Systemic Impact • Elevated Cardiac Burden",
        textColor: "text-rose-400",
        borderColor: "border-rose-500/40",
        bgColor: "bg-rose-500/10",
        ringColor: "#f43f5e",
        guidance: "Everyone may begin to experience adverse health effects; sensitive groups suffer serious symptoms.",
        respirator: "N95/FFP2 certified respirators strongly advised outdoors.",
        ventilation: "Closed loop internal HVAC with MERV-16 or HEPA H13 stages.",
      };
    }
    if (val <= 300) {
      return {
        label: "Very Unhealthy",
        subtitle: "Emergency Conditions • Alveolar Inflammatory Cascade",
        textColor: "text-purple-400",
        borderColor: "border-purple-500/40",
        bgColor: "bg-purple-500/10",
        ringColor: "#a855f7",
        guidance: "Health alert: high risk of acute respiratory distress across entire metropolitan population.",
        respirator: "Continuous N99/P100 respirators required for outdoor transit.",
        ventilation: "Hermetic indoor positive-pressure filtration advised.",
      };
    }
    return {
      label: "Hazardous",
      subtitle: "Severe Toxic Inversion • Critical Alert",
      textColor: "text-red-500",
      borderColor: "border-red-600/50",
      bgColor: "bg-red-600/15",
      ringColor: "#ef4444",
      guidance: "Emergency warning: catastrophic atmospheric stagnation. Entire population susceptible to severe toxicity.",
      respirator: "Outdoor confinement mandated; industrial respirators mandatory.",
      ventilation: "Critical isolation; multi-stage gas & aerosol scrubbing.",
    };
  };

  const details = getAqiDetails(activeAqi);

  // SVG Gauge calculations
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  // Arc covers 260 degrees (from 140deg to 400deg)
  const maxArcValue = 500;
  const strokePercentage = Math.min(1, Math.max(0, activeAqi / maxArcValue));
  const dashoffset = circumference * (1 - strokePercentage * 0.75);

  // Scale pollutant values when in manual override
  const scale = manualOverride ? activeAqi / (selectedCity.aqi || 1) : 1;
  const currentPm25 = (selectedCity.pm25 * scale).toFixed(1);
  const currentPm10 = (selectedCity.pm10 * scale).toFixed(1);
  const currentNo2 = (selectedCity.no2 * Math.sqrt(scale)).toFixed(1);
  const currentO3 = (selectedCity.o3 * Math.sqrt(scale)).toFixed(1);
  const currentCo = (selectedCity.co * scale).toFixed(2);
  const currentSo2 = (selectedCity.so2 * scale).toFixed(1);

  return (
    <section id="simulator" className="py-24 bg-slate-950 relative border-b border-slate-800/80">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-slate-900/60 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800/80 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              <GaugeIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive Atmospheric Laboratory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Real-Time AQI &amp; Particulate Simulator
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Inspect telemetric air quality indices across representative metropolitan centers
              or manually perturb atmospheric stress levels to test physiological thresholds.
            </p>
          </div>

          {/* Mode Switch Status */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-xs font-mono">
            <span className="text-slate-400 pl-2">Mode:</span>
            <button
              onClick={() => setManualOverride(false)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                !manualOverride
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Station Presets
            </button>
            <button
              onClick={() => setManualOverride(true)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                manualOverride
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Manual Dial
            </button>
          </div>
        </div>

        {/* City Switcher Bar */}
        <div className="mb-10">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Metropolitan Sensor Arrays</span>
            <span>Select Station</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {CITIES.map((city) => {
              const isSelected = selectedCity.name === city.name && !manualOverride;
              return (
                <button
                  key={city.name}
                  onClick={() => handleCitySelect(city)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-800/90 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                      : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-white">
                      {city.name}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        city.aqi <= 50
                          ? "text-emerald-400"
                          : city.aqi <= 100
                          ? "text-amber-400"
                          : city.aqi <= 200
                          ? "text-orange-400"
                          : "text-rose-500"
                      }`}
                    >
                      {city.aqi}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">
                    {city.country}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Main Control Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Circular Dial & Slider (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <SlidersIcon className="w-3.5 h-3.5 text-emerald-400" />
                Index Radiometer
              </span>
              <span
                className={`text-xs font-mono uppercase px-2.5 py-1 rounded-md border ${details.bgColor} ${details.borderColor} ${details.textColor}`}
              >
                {details.label}
              </span>
            </div>

            {/* Circular SVG Gauge */}
            <div className="relative flex flex-col items-center justify-center my-4">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                  {/* Track ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className="stroke-slate-800"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={circumference * 0.75}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Active gauge ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke={details.ringColor}
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={circumference * 0.75}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                    style={{
                      filter: `drop-shadow(0 0 8px ${details.ringColor}60)`,
                    }}
                  />
                </svg>

                {/* Inside Dial Center readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    AQI Value
                  </span>
                  <span className="text-6xl font-black text-white font-mono tracking-tighter my-1">
                    {activeAqi}
                  </span>
                  <span className={`text-xs font-mono font-medium ${details.textColor}`}>
                    {details.subtitle.split("•")[0]}
                  </span>
                </div>
              </div>

              <div className="text-center mt-2">
                <p className="text-xs text-slate-400 font-mono">
                  Scale: 0 (Ultra Pristine) — 500 (Severe Toxic Stagnation)
                </p>
              </div>
            </div>

            {/* Manual Stress Slider */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300 font-medium">Perturb AQI Index Manually:</span>
                <span className="text-emerald-400 font-bold">{activeAqi} / 500</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                value={activeAqi}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
                <span>300</span>
                <span>500</span>
              </div>
            </div>

            {/* Atmospheric Microclimate Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-6 border-t border-slate-800 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[11px] mb-1">
                  <ThermometerIcon className="w-3 h-3 text-cyan-400" />
                  <span>Temp</span>
                </div>
                <div className="text-sm font-bold font-mono text-white">
                  {selectedCity.temp}°C
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[11px] mb-1">
                  <DropletsIcon className="w-3 h-3 text-cyan-400" />
                  <span>Humidity</span>
                </div>
                <div className="text-sm font-bold font-mono text-white">
                  {selectedCity.humidity}%
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[11px] mb-1">
                  <WindIcon className="w-3 h-3 text-teal-400" />
                  <span>Wind</span>
                </div>
                <div className="text-sm font-bold font-mono text-white">
                  {selectedCity.windSpeed} km/h
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[11px] mb-1">
                  <CompassIcon className="w-3 h-3 text-emerald-400" />
                  <span>Pressure</span>
                </div>
                <div className="text-sm font-bold font-mono text-white">
                  {selectedCity.pressure} hPa
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Pollutant Readouts & Health Directive (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Health & Clinical Directives Box */}
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${details.bgColor} ${details.borderColor}`}
            >
              <div className="flex items-center gap-3 mb-3">
                {activeAqi <= 100 ? (
                  <ShieldCheckIcon className={`w-5 h-5 ${details.textColor}`} />
                ) : (
                  <ShieldAlertIcon className={`w-5 h-5 ${details.textColor}`} />
                )}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300">
                  Epidemiological Health Guidance
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${details.textColor}`}>
                {details.subtitle}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-4">
                {details.guidance}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400 font-mono block mb-1">
                    Protective Barrier Protocol:
                  </span>
                  <span className="text-slate-200 font-medium">
                    {details.respirator}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400 font-mono block mb-1">
                    Building Enclosure Protocol:
                  </span>
                  <span className="text-slate-200 font-medium">
                    {details.ventilation}
                  </span>
                </div>
              </div>
            </div>

            {/* Speciated Pollutants Breakdown Matrix */}
            <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Speciated Particulate &amp; Gas Concentrations
                </span>
                <span className="text-xs font-mono text-slate-400">
                  WHO 2021 Reference Benchmark
                </span>
              </div>

              <div className="space-y-4">
                {/* PM2.5 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-semibold">
                      Fine Particulate Matter (PM2.5)
                    </span>
                    <span className="text-slate-200">
                      <strong className="text-emerald-400">{currentPm25}</strong> µg/m³
                      <span className="text-slate-400 ml-1.5">(WHO limit: 5 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (Number(currentPm25) / 120) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* PM10 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-semibold">
                      Coarse Inhalable Matter (PM10)
                    </span>
                    <span className="text-slate-200">
                      <strong className="text-emerald-400">{currentPm10}</strong> µg/m³
                      <span className="text-slate-400 ml-1.5">(WHO limit: 15 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (Number(currentPm10) / 200) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* NO2 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-semibold">
                      Nitrogen Dioxide (NO₂)
                    </span>
                    <span className="text-slate-200">
                      <strong className="text-emerald-400">{currentNo2}</strong> µg/m³
                      <span className="text-slate-400 ml-1.5">(WHO limit: 25 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (Number(currentNo2) / 100) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* O3 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-semibold">
                      Tropospheric Ozone (O₃)
                    </span>
                    <span className="text-slate-200">
                      <strong className="text-emerald-400">{currentO3}</strong> µg/m³
                      <span className="text-slate-400 ml-1.5">(WHO limit: 60 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (Number(currentO3) / 120) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Carbon Monoxide & Sulfur Dioxide in a 2-col row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>Carbon Monoxide (CO)</span>
                      <span className="text-white font-bold">{currentCo} mg/m³</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      WHO 24h Threshold: 4.0 mg/m³
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>Sulfur Dioxide (SO₂)</span>
                      <span className="text-white font-bold">{currentSo2} µg/m³</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      WHO 24h Threshold: 40 µg/m³
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
