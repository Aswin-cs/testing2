"use client";

import React, { useState } from "react";
import { SearchIcon, GlobeIcon } from "./Icons";

interface MetrologyRecord {
  city: string;
  country: string;
  region: "Europe" | "Asia-Pacific" | "Americas";
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  delta24h: number;
  compliance: "Compliant" | "Moderate Exceedance" | "Severe Exceedance";
}

const RECORDS: MetrologyRecord[] = [
  {
    city: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    aqi: 14,
    pm25: 3.4,
    pm10: 6.2,
    no2: 8.5,
    delta24h: -4.2,
    compliance: "Compliant",
  },
  {
    city: "Helsinki",
    country: "Finland",
    region: "Europe",
    aqi: 19,
    pm25: 4.8,
    pm10: 8.1,
    no2: 11.2,
    delta24h: -1.5,
    compliance: "Compliant",
  },
  {
    city: "Zurich",
    country: "Switzerland",
    region: "Europe",
    aqi: 24,
    pm25: 5.8,
    pm10: 9.4,
    no2: 12.1,
    delta24h: +2.1,
    compliance: "Moderate Exceedance",
  },
  {
    city: "Vancouver",
    country: "Canada",
    region: "Americas",
    aqi: 28,
    pm25: 6.9,
    pm10: 12.0,
    no2: 15.4,
    delta24h: -3.8,
    compliance: "Moderate Exceedance",
  },
  {
    city: "Tokyo",
    country: "Japan",
    region: "Asia-Pacific",
    aqi: 38,
    pm25: 9.2,
    pm10: 17.5,
    no2: 24.3,
    delta24h: +1.2,
    compliance: "Moderate Exceedance",
  },
  {
    city: "Sydney",
    country: "Australia",
    region: "Asia-Pacific",
    aqi: 42,
    pm25: 10.4,
    pm10: 21.0,
    no2: 18.2,
    delta24h: -6.5,
    compliance: "Moderate Exceedance",
  },
  {
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    aqi: 64,
    pm25: 18.6,
    pm10: 29.2,
    no2: 43.8,
    delta24h: +5.4,
    compliance: "Moderate Exceedance",
  },
  {
    city: "New York",
    country: "United States",
    region: "Americas",
    aqi: 72,
    pm25: 22.4,
    pm10: 36.1,
    no2: 49.0,
    delta24h: +3.6,
    compliance: "Moderate Exceedance",
  },
  {
    city: "Paris",
    country: "France",
    region: "Europe",
    aqi: 78,
    pm25: 24.8,
    pm10: 38.5,
    no2: 52.1,
    delta24h: -2.0,
    compliance: "Moderate Exceedance",
  },
  {
    city: "Sao Paulo",
    country: "Brazil",
    region: "Americas",
    aqi: 95,
    pm25: 32.5,
    pm10: 54.0,
    no2: 46.8,
    delta24h: +7.2,
    compliance: "Moderate Exceedance",
  },
  {
    city: "Seoul",
    country: "South Korea",
    region: "Asia-Pacific",
    aqi: 132,
    pm25: 48.0,
    pm10: 82.5,
    no2: 58.2,
    delta24h: +14.5,
    compliance: "Severe Exceedance",
  },
  {
    city: "Cairo",
    country: "Egypt",
    region: "Americas",
    aqi: 184,
    pm25: 118.2,
    pm10: 194.0,
    no2: 74.0,
    delta24h: +8.4,
    compliance: "Severe Exceedance",
  },
  {
    city: "New Delhi",
    country: "India",
    region: "Asia-Pacific",
    aqi: 348,
    pm25: 298.5,
    pm10: 442.0,
    no2: 104.2,
    delta24h: +22.0,
    compliance: "Severe Exceedance",
  },
  {
    city: "Lahore",
    country: "Pakistan",
    region: "Asia-Pacific",
    aqi: 382,
    pm25: 334.0,
    pm10: 512.0,
    no2: 112.5,
    delta24h: +18.2,
    compliance: "Severe Exceedance",
  },
];

export default function MetrologyTable() {
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState<string>("ALL");

  const filtered = RECORDS.filter((rec) => {
    const matchesSearch =
      rec.city.toLowerCase().includes(search.toLowerCase()) ||
      rec.country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion =
      filterRegion === "ALL" ||
      (filterRegion === "EXCEED" && rec.compliance === "Severe Exceedance") ||
      rec.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section id="metrology" className="py-24 bg-slate-100/70 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 uppercase tracking-widest mb-3 font-semibold">
              <GlobeIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>International Metrology Surveillance</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Global Urban Air Ledger
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Certified continuous air quality observations normalized across calibrated
              Beta Attenuation Monitors (BAM) and optical spectrometers.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search city or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 font-mono focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-mono">
          <span className="text-slate-500 mr-2 font-medium">Filter Matrix:</span>
          {["ALL", "Europe", "Asia-Pacific", "Americas", "EXCEED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterRegion(f)}
              className={`px-3 py-1.5 rounded-lg border transition-all shadow-2xs ${
                filterRegion === f
                  ? "bg-emerald-600 text-white border-emerald-600 font-semibold"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
              }`}
            >
              {f === "ALL"
                ? "All Regions"
                : f === "EXCEED"
                ? "Severe Exceedance Only"
                : f}
            </button>
          ))}
          <span className="ml-auto text-slate-500 text-[11px] font-medium">
            Displaying {filtered.length} of {RECORDS.length} monitored cities
          </span>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase text-[11px] tracking-wider font-bold">
                <tr>
                  <th className="py-4 px-6">Metropolitan Station</th>
                  <th className="py-4 px-4">Region</th>
                  <th className="py-4 px-4">AQI Index</th>
                  <th className="py-4 px-4">PM2.5 (µg/m³)</th>
                  <th className="py-4 px-4">PM10 (µg/m³)</th>
                  <th className="py-4 px-4">NO₂ (µg/m³)</th>
                  <th className="py-4 px-4">24h Shift</th>
                  <th className="py-4 px-6">WHO 2021 Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr
                    key={row.city}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-medium text-slate-900">
                      <div className="font-bold text-sm text-slate-900">{row.city}</div>
                      <div className="text-[11px] text-slate-500">{row.country}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{row.region}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md border text-xs font-mono font-bold ${
                          row.aqi <= 50
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : row.aqi <= 100
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : row.aqi <= 200
                            ? "bg-orange-100 text-orange-900 border-orange-300"
                            : "bg-rose-100 text-rose-900 border-rose-300"
                        }`}
                      >
                        {row.aqi}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 font-bold">
                      {row.pm25.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{row.pm10.toFixed(1)}</td>
                    <td className="py-3.5 px-4 text-slate-700">{row.no2.toFixed(1)}</td>
                    <td
                      className={`py-3.5 px-4 font-semibold ${
                        row.delta24h > 0 ? "text-rose-700 font-bold" : "text-emerald-700 font-bold"
                      }`}
                    >
                      {row.delta24h > 0 ? `+${row.delta24h}%` : `${row.delta24h}%`}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          row.compliance === "Compliant"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : row.compliance === "Moderate Exceedance"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-rose-100 text-rose-900 border-rose-300"
                        }`}
                      >
                        {row.compliance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
