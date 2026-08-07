'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, ShieldCheck, Heart, Sun, FileText, CheckCircle2 } from 'lucide-react';

interface VetExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VetExportModal: React.FC<VetExportModalProps> = ({ isOpen, onClose }) => {
  const { activePet, activeTelemetry, activeCollar } = useApp();

  if (!isOpen || !activePet || !activeTelemetry || !activeCollar) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-solar-card border border-solar-borderPrimary rounded-solar-3xl shadow-solar-floating p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-150 my-8">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-solar-textMuted hover:text-solar-forest hover:bg-solar-bgSecondary transition-colors print:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Certificate Branding */}
        <div className="border-b border-solar-borderPrimary pb-4 mb-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img
              src="https://ik.imagekit.io/yashveersinghrajpoot/solar_paw/logo.jpeg"
              alt="Solar Paw Sense Logo"
              className="w-7 h-7 rounded-xl object-cover border border-solar-borderPrimary"
            />
            <h2 className="text-xl font-bold text-solar-forest tracking-tight">SolarPaw Sense Official Health Certificate</h2>
          </div>
          <p className="text-xs text-solar-textMuted">Certified Telemetry & Vital Sign Verification Card for Veterinary Clinics</p>
        </div>

        {/* Pet Details & Microchip */}
        <div className="flex items-center gap-4 p-4 rounded-solar-2xl bg-solar-bgSecondary border border-solar-borderPrimary mb-5">
          <img src={activePet.photoUrl} alt={activePet.name} className="w-16 h-16 rounded-solar-2xl object-cover border border-solar-gold" />
          <div className="flex-1 text-xs">
            <h3 className="text-base font-bold text-solar-textPrimary">{activePet.name}</h3>
            <p className="text-solar-textSecondary">
              Species: <strong>{activePet.species}</strong> • Breed: <strong>{activePet.breed}</strong>
            </p>
            <p className="text-solar-textSecondary">
              Age: <strong>{activePet.ageYears} yrs</strong> • Weight: <strong>{activePet.weightKg} kg</strong>
            </p>
            <p className="font-mono text-solar-forest font-semibold mt-0.5">Microchip: {activePet.microchipId}</p>
          </div>
        </div>

        {/* Verified Vitals Table */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-solar-forest uppercase tracking-wider">Verified Telemetry Metrics (Last 24 Hours)</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-solar-card border border-solar-borderPrimary">
              <div className="text-solar-textMuted">Resting Heart Rate</div>
              <div className="text-sm font-bold text-solar-textPrimary mt-0.5">{activeTelemetry.heartRateBpm} BPM (Normal)</div>
            </div>

            <div className="p-3 rounded-xl bg-solar-card border border-solar-borderPrimary">
              <div className="text-solar-textMuted">Body Temperature</div>
              <div className="text-sm font-bold text-solar-textPrimary mt-0.5">{activeTelemetry.bodyTempCelsius}°C (Normal)</div>
            </div>

            <div className="p-3 rounded-xl bg-solar-card border border-solar-borderPrimary">
              <div className="text-solar-textMuted">Stress Index</div>
              <div className="text-sm font-bold text-solar-textPrimary mt-0.5">{activeTelemetry.stressScore} / 100 (Optimal)</div>
            </div>

            <div className="p-3 rounded-xl bg-solar-card border border-solar-borderPrimary">
              <div className="text-solar-textMuted">Solar Collar Battery</div>
              <div className="text-sm font-bold text-solar-textPrimary mt-0.5">{activeCollar.batteryPercentage}% (Solar Assisted)</div>
            </div>
          </div>
        </div>

        {/* Medical & Feeding Record */}
        <div className="space-y-2 text-xs mb-6 p-4 rounded-solar-2xl bg-solar-elevated border border-solar-borderPrimary">
          <div>
            <span className="font-bold text-solar-forest">Medical Conditions: </span>
            <span>{activePet.medicalConditions.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold text-solar-forest">Feeding Routine: </span>
            <span>{activePet.feedingSchedule}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-solar-borderPrimary pt-4 print:hidden">
          <span className="text-[11px] text-solar-textMuted">Generated on {new Date().toLocaleDateString()}</span>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-solar-forest hover:bg-solar-moss text-white text-xs font-bold rounded-solar-xl shadow-solar-soft flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4 text-solar-gold" /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};
