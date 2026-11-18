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

  const getAqiDetails = (val: number) => {
    if (val <= 50) {
      return {
        label: "Good",
        subtitle: "Minimal Risk • Optimal Cellular Respiration",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-300",
        bgColor: "bg-emerald-50",
        ringColor: "#059669",
        guidance: "Air quality is considered satisfactory; atmospheric pollution poses negligible risk.",
        respirator: "Unrestricted outdoor ventilatory activity.",
        ventilation: "Full natural cross-ventilation encouraged.",
      };
    }
    if (val <= 100) {
      return {
        label: "Moderate",
        subtitle: "Acceptable • Minor Respiratory Irritation Potential",
        textColor: "text-amber-700",
        borderColor: "border-amber-300",
        bgColor: "bg-amber-50",
        ringColor: "#d97706",
        guidance: "Air quality is acceptable; unusually sensitive individuals may experience mild cough.",
        respirator: "Sensitive groups should limit prolonged heavy outdoor exertion.",
        ventilation: "Standard window ventilation; indoor HEPA optional.",
      };
    }
    if (val <= 150) {
      return {
        label: "Unhealthy for Sensitive Groups",
        subtitle: "Heightened Vulnerability • Micro-Particulate Stress",
        textColor: "text-orange-700",
        borderColor: "border-orange-300",
        bgColor: "bg-orange-50",
        ringColor: "#ea580c",
        guidance: "Members of sensitive groups may experience physiological effects; general public is less affected.",
        respirator: "Sensitive groups should wear particulate filtering masks (KF94/FFP2).",
        ventilation: "Seal building envelopes; activate primary filtration systems.",
      };
    }
    if (val <= 200) {
      return {
        label: "Unhealthy",
        subtitle: "Systemic Impact • Elevated Cardiac Burden",
        textColor: "text-rose-700",
        borderColor: "border-rose-300",
        bgColor: "bg-rose-50",
        ringColor: "#e11d48",
        guidance: "Everyone may begin to experience adverse health effects; sensitive groups suffer serious symptoms.",
        respirator: "N95/FFP2 certified respirators strongly advised outdoors.",
        ventilation: "Closed loop internal HVAC with MERV-16 or HEPA H13 stages.",
      };
    }
    if (val <= 300) {
      return {
        label: "Very Unhealthy",
        subtitle: "Emergency Conditions • Alveolar Inflammatory Cascade",
        textColor: "text-purple-700",
        borderColor: "border-purple-300",
        bgColor: "bg-purple-50",
        ringColor: "#9333ea",
        guidance: "Health alert: high risk of acute respiratory distress across entire metropolitan population.",
        respirator: "Continuous N99/P100 respirators required for outdoor transit.",
        ventilation: "Hermetic indoor positive-pressure filtration advised.",
      };
    }
    return {
      label: "Hazardous",
      subtitle: "Severe Toxic Inversion • Critical Alert",
      textColor: "text-red-700",
      borderColor: "border-red-300",
      bgColor: "bg-red-50",
      ringColor: "#dc2626",
      guidance: "Emergency warning: catastrophic atmospheric stagnation. Entire population susceptible to severe toxicity.",
      respirator: "Outdoor confinement mandated; industrial respirators mandatory.",
      ventilation: "Critical isolation; multi-stage gas & aerosol scrubbing.",
    };
  };

  const details = getAqiDetails(activeAqi);

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const maxArcValue = 500;
  const strokePercentage = Math.min(1, Math.max(0, activeAqi / maxArcValue));
  const dashoffset = circumference * (1 - strokePercentage * 0.75);

  const scale = manualOverride ? activeAqi / (selectedCity.aqi || 1) : 1;
  const currentPm25 = (selectedCity.pm25 * scale).toFixed(1);
  const currentPm10 = (selectedCity.pm10 * scale).toFixed(1);
  const currentNo2 = (selectedCity.no2 * Math.sqrt(scale)).toFixed(1);
  const currentO3 = (selectedCity.o3 * Math.sqrt(scale)).toFixed(1);
  const currentCo = (selectedCity.co * scale).toFixed(2);
  const currentSo2 = (selectedCity.so2 * scale).toFixed(1);

  return (
    <section id="simulator" className="py-24 bg-slate-100/70 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 uppercase tracking-widest mb-3 font-semibold">
              <GaugeIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Atmospheric Laboratory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Real-Time AQI &amp; Particulate Simulator
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Inspect telemetric air quality indices across representative metropolitan centers
              or manually perturb atmospheric stress levels to test physiological thresholds.
            </p>
          </div>

          {/* Mode Switch Status */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl text-xs font-mono shadow-sm">
            <span className="text-slate-500 pl-2">Mode:</span>
            <button
              onClick={() => setManualOverride(false)}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                !manualOverride
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Station Presets
            </button>
            <button
              onClick={() => setManualOverride(true)}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                manualOverride
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Manual Dial
            </button>
          </div>
        </div>

        {/* City Switcher Bar */}
        <div className="mb-10">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between font-semibold">
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
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 shadow-sm ${
                    isSelected
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                      : "bg-white/90 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-slate-900">
                      {city.name}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        city.aqi <= 50
                          ? "text-emerald-600"
                          : city.aqi <= 100
                          ? "text-amber-600"
                          : city.aqi <= 200
                          ? "text-orange-600"
                          : "text-rose-600"
                      }`}
                    >
                      {city.aqi}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 truncate">
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
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 flex items-center gap-2 font-semibold">
                <SlidersIcon className="w-3.5 h-3.5 text-emerald-600" />
                Index Radiometer
              </span>
              <span
                className={`text-xs font-mono uppercase px-2.5 py-1 rounded-md border font-semibold ${details.bgColor} ${details.borderColor} ${details.textColor}`}
              >
                {details.label}
              </span>
            </div>

            {/* Circular SVG Gauge */}
            <div className="relative flex flex-col items-center justify-center my-4">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className="stroke-slate-100"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={circumference * 0.75}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
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
                  />
                </svg>

                {/* Inside Dial Center readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">
                    AQI Value
                  </span>
                  <span className="text-6xl font-black text-slate-900 font-mono tracking-tighter my-1">
                    {activeAqi}
                  </span>
                  <span className={`text-xs font-mono font-semibold ${details.textColor}`}>
                    {details.subtitle.split("•")[0]}
                  </span>
                </div>
              </div>

              <div className="text-center mt-2">
                <p className="text-xs text-slate-500 font-mono">
                  Scale: 0 (Ultra Pristine) — 500 (Severe Toxic Stagnation)
                </p>
              </div>
            </div>

            {/* Manual Stress Slider */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-800 font-medium">Perturb AQI Index Manually:</span>
                <span className="text-emerald-700 font-bold">{activeAqi} / 500</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                value={activeAqi}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 font-medium">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-6 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[11px] mb-1 font-medium">
                  <ThermometerIcon className="w-3 h-3 text-cyan-600" />
                  <span>Temp</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-900">
                  {selectedCity.temp}°C
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[11px] mb-1 font-medium">
                  <DropletsIcon className="w-3 h-3 text-cyan-600" />
                  <span>Humidity</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-900">
                  {selectedCity.humidity}%
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[11px] mb-1 font-medium">
                  <WindIcon className="w-3 h-3 text-teal-600" />
                  <span>Wind</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-900">
                  {selectedCity.windSpeed} km/h
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[11px] mb-1 font-medium">
                  <CompassIcon className="w-3 h-3 text-emerald-600" />
                  <span>Pressure</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-900">
                  {selectedCity.pressure} hPa
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Pollutant Readouts & Health Directive (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Health & Clinical Directives Box */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm ${details.bgColor} ${details.borderColor}`}
            >
              <div className="flex items-center gap-3 mb-3">
                {activeAqi <= 100 ? (
                  <ShieldCheckIcon className={`w-5 h-5 ${details.textColor}`} />
                ) : (
                  <ShieldAlertIcon className={`w-5 h-5 ${details.textColor}`} />
                )}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-700">
                  Epidemiological Health Guidance
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${details.textColor}`}>
                {details.subtitle}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {details.guidance}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200/80 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-slate-500 font-mono block mb-1 font-semibold">
                    Protective Barrier Protocol:
                  </span>
                  <span className="text-slate-800 font-medium">
                    {details.respirator}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-slate-500 font-mono block mb-1 font-semibold">
                    Building Enclosure Protocol:
                  </span>
                  <span className="text-slate-800 font-medium">
                    {details.ventilation}
                  </span>
                </div>
              </div>
            </div>

            {/* Speciated Pollutants Breakdown Matrix */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                  Speciated Particulate &amp; Gas Concentrations
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  WHO 2021 Reference Benchmark
                </span>
              </div>

              <div className="space-y-4">
                {/* PM2.5 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-900 font-semibold">
                      Fine Particulate Matter (PM2.5)
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-emerald-700">{currentPm25}</strong> µg/m³
                      <span className="text-slate-500 ml-1.5">(WHO limit: 5 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
                    <span className="text-slate-900 font-semibold">
                      Coarse Inhalable Matter (PM10)
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-emerald-700">{currentPm10}</strong> µg/m³
                      <span className="text-slate-500 ml-1.5">(WHO limit: 15 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
                    <span className="text-slate-900 font-semibold">
                      Nitrogen Dioxide (NO₂)
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-emerald-700">{currentNo2}</strong> µg/m³
                      <span className="text-slate-500 ml-1.5">(WHO limit: 25 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
                    <span className="text-slate-900 font-semibold">
                      Tropospheric Ozone (O₃)
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-emerald-700">{currentO3}</strong> µg/m³
                      <span className="text-slate-500 ml-1.5">(WHO limit: 60 µg/m³)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1">
                      <span className="font-medium">Carbon Monoxide (CO)</span>
                      <span className="text-slate-900 font-bold">{currentCo} mg/m³</span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      WHO 24h Threshold: 4.0 mg/m³
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1">
                      <span className="font-medium">Sulfur Dioxide (SO₂)</span>
                      <span className="text-slate-900 font-bold">{currentSo2} µg/m³</span>
                    </div>
                    <span className="text-[11px] text-slate-500">
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
