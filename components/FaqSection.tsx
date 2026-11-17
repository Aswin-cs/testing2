"use client";

import React, { useState } from "react";
import { ChevronDownIcon, CheckCircleIcon } from "./Icons";

interface FaqItem {
  question: string;
  category: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    category: "Metrology & Sensor Instrumentation",
    question: "How are reference-grade monitors calibrated against low-cost IoT sensors?",
    answer:
      "Regulatory government stations rely on Federal Equivalent Method (FEM) devices, predominantly Beta Attenuation Monitors (BAM-1020) and tapered element oscillating microbalances (TEOM), which measure mass deposition directly via beta radiation absorption. Low-cost IoT sensors employ nephelometry (light scattering at 650–900 nm). Because laser scattering is distorted by relative humidity (hygroscopic aerosol swelling), raw optical signals must be dynamically calibrated against co-located BAM stations using non-linear machine learning models (e.g. k-nearest neighbor or random forest humidity regression).",
  },
  {
    category: "Cardiovascular Pathophysiology",
    question: "Why does a moderate PM2.5 spike still pose severe cardiovascular mortality risks?",
    answer:
      "Epidemiological data shows no safe lower threshold for PM2.5 exposure. Inhaled ultra-fine particulates (<0.1 µm) do not merely irritate lung tissue; they cross the alveolar-capillary membrane directly into systemic circulation. In the bloodstream, they trigger platelet activation, endothelial dysfunction, acute autonomic nervous system imbalance, and atherosclerotic plaque instability, precipitating acute myocardial infarctions and ischemic cerebrovascular strokes within 2 to 24 hours of exposure.",
  },
  {
    category: "Personal Protective Equipment",
    question: "What physical filtration mechanisms govern N95 and FFP2 respirator performance?",
    answer:
      "Certified particulate respirators rely on four physical filtration mechanisms: inertial impaction (for large particles >1 µm), interception (particles following streamlines that graze fibers), Brownian diffusion (sub-0.1 µm particles zigzagging into fibers), and electrostatic attraction via permanently charged electret fibers. The electrostatic charge captures the most penetrating particle size (MPPS, ~0.3 µm) with greater than 95% efficiency, whereas simple cloth or surgical masks lack edge seals and electret charge, providing minimal sub-micron protection.",
  },
  {
    category: "Satellite Remote Sensing",
    question: "How do satellite instruments like Sentinel-5P TROPOMI quantify tropospheric columns?",
    answer:
      "The TROPOspheric Monitoring Instrument (TROPOMI) on the Copernicus Sentinel-5P satellite measures solar backscattered radiation across ultraviolet, visible, and near-infrared spectral bands (270–2385 nm). By applying Differential Optical Absorption Spectroscopy (DOAS), algorithm models subtract stratospheric absorption and Rayleigh scattering to quantify the total tropospheric slant column density of NO2, SO2, CO, and aerosol optical depth (AOD) at 5.5 × 3.5 km spatial resolution.",
  },
  {
    category: "Indoor Environmental Defense",
    question: "What engineering standards define an effective indoor clean air shelter during severe smog?",
    answer:
      "Effective residential isolation requires three elements: envelope hermetic sealing (reducing uncontrolled building air leakage), high Clean Air Delivery Rate (CADR) mechanical filtration (True HEPA H13/H14 removing 99.97% of 0.3 µm particles), and positive pressure displacement. Gas-phase adsorption stages containing activated carbon with potassium permanganate (KMnO4) impregnation are required to neutralize gaseous VOCs, NO2, and sulfur compounds which HEPA fibers cannot intercept.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-slate-900/60 relative border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scientific Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scientific &amp; Technical Methodologies
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Explanations on aerosol physics, metrological calibration, and clinical exposure science.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/90 bg-slate-950/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 font-sans">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
