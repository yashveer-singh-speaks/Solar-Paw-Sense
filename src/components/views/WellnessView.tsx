'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Heart, Flame, Wind, Moon, ShieldCheck, FileText, Download, PhoneCall, Stethoscope } from 'lucide-react';

interface WellnessViewProps {
  onOpenVetExportModal: () => void;
}

export const WellnessView: React.FC<WellnessViewProps> = ({ onOpenVetExportModal }) => {
  const { activePet, activeTelemetry } = useApp();

  if (!activePet || !activeTelemetry) return null;

  // Mock 24-Hour Heart Rate Timeline data
  const hrTimeline = [
    { time: '12 AM', bpm: 68 },
    { time: '04 AM', bpm: 64 },
    { time: '08 AM', bpm: 82 },
    { time: '12 PM', bpm: 95 },
    { time: '04 PM', bpm: 74 },
    { time: '08 PM', bpm: 72 },
  ];

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <div>
          <h2 className="text-lg font-bold text-solar-textPrimary flex items-center gap-2">
            <Activity className="w-5 h-5 text-solar-forest" />
            Comprehensive Wellness & Vital Analytics
          </h2>
          <p className="text-xs text-solar-textMuted mt-0.5">
            24/7 continuous sensor tracking for {activePet.name} ({activePet.breed}).
          </p>
        </div>

        <button
          onClick={onOpenVetExportModal}
          className="px-4 py-2 bg-solar-forest text-white text-xs font-semibold rounded-solar-xl shadow-solar-soft hover:bg-solar-moss transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-solar-gold" />
          Export Vet Health Card
        </button>
      </div>

      {/* Vital Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted flex items-center justify-between mb-1">
            <span>Resting Heart Rate</span>
            <Heart className="w-4 h-4 text-solar-danger" />
          </div>
          <div className="text-xl font-bold text-solar-textPrimary">{activeTelemetry.heartRateBpm} BPM</div>
          <div className="text-[10px] text-solar-success font-semibold mt-1">✓ Normal baseline</div>
        </div>

        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted flex items-center justify-between mb-1">
            <span>Stress Index</span>
            <ShieldCheck className="w-4 h-4 text-solar-forest" />
          </div>
          <div className="text-xl font-bold text-solar-textPrimary">{activeTelemetry.stressScore} / 100</div>
          <div className="text-[10px] text-solar-forest font-semibold mt-1">Relaxed & Calm</div>
        </div>

        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted flex items-center justify-between mb-1">
            <span>Sleep Duration</span>
            <Moon className="w-4 h-4 text-solar-gold" />
          </div>
          <div className="text-xl font-bold text-solar-textPrimary">{activeTelemetry.sleepHours} hrs</div>
          <div className="text-[10px] text-solar-brass font-semibold mt-1">Deep Restful Sleep</div>
        </div>

        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted flex items-center justify-between mb-1">
            <span>Air Quality Exposure</span>
            <Wind className="w-4 h-4 text-solar-sage" />
          </div>
          <div className="text-xl font-bold text-solar-textPrimary">AQI {activeTelemetry.airQualityAqi}</div>
          <div className="text-[10px] text-solar-success font-semibold mt-1">Fresh Outdoor Zone</div>
        </div>
      </div>

      {/* Call your nearest Vet Section */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-solar-textPrimary flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-solar-forest" />
              Call your nearest Vet
            </h3>
            <p className="text-xs text-solar-textMuted mt-0.5">
              Direct emergency 1-tap dial to verified veterinary specialists near you.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-solar-success/15 text-solar-success border border-solar-success/30">
            24/7 Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Dr. Rajesh Sharma', clinic: 'PetCare Emergency Vet Hospital', phone: '+91 98765 43210', rawPhone: '+919876543210' },
            { name: 'Dr. Ananya Verma', clinic: 'SolarPaw City Vet Clinic', phone: '+91 98123 45678', rawPhone: '+919812345678' },
            { name: 'Dr. Vikramaditya Rao', clinic: '24/7 Apex Animal Health Center', phone: '+91 99887 76655', rawPhone: '+919988776655' },
            { name: 'Dr. Priya Sundaram', clinic: 'MaxVet Care & Specialty Center', phone: '+91 97654 32109', rawPhone: '+919765432109' },
            { name: 'Dr. Arjun Kapoor', clinic: 'Royal Canine & Feline Hospital', phone: '+91 98989 12345', rawPhone: '+919898912345' },
          ].map((doc, idx) => (
            <a
              key={idx}
              href={`tel:${doc.rawPhone}`}
              className="p-3.5 rounded-solar-2xl bg-solar-elevated border border-solar-borderPrimary hover:border-solar-gold hover:bg-solar-card transition-all group shadow-solar-soft flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-solar-textPrimary group-hover:text-solar-forest transition-colors">
                  {doc.name}
                </div>
                <div className="text-[11px] text-solar-textMuted mt-0.5">{doc.clinic}</div>
                <div className="text-xs font-mono font-semibold text-solar-forest mt-1.5 flex items-center gap-1">
                  <span>{doc.phone}</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-solar-xl bg-solar-forest/10 group-hover:bg-solar-forest group-hover:text-white text-solar-forest flex items-center justify-center transition-all flex-shrink-0 ml-2 border border-solar-forest/20">
                <PhoneCall className="w-4 h-4 text-solar-gold" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 24-Hour Heart Rate Graph Visualization */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <h3 className="text-sm font-bold text-solar-textPrimary mb-1">24-Hour Cardiac Baseline (BPM)</h3>
        <p className="text-xs text-solar-textMuted mb-6">Continuous optical PPG sensor monitoring via collar strap.</p>

        {/* CSS Chart Bars */}
        <div className="h-44 flex items-end justify-between gap-2 px-4 pb-2 border-b border-solar-borderPrimary">
          {hrTimeline.map((pt, idx) => {
            const heightPercent = Math.min(100, Math.round((pt.bpm / 120) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-solar-forest opacity-0 group-hover:opacity-100 transition-opacity">
                  {pt.bpm} BPM
                </span>
                <div className="w-full bg-solar-bgSecondary rounded-t-xl h-36 flex items-end p-1">
                  <div
                    className="w-full bg-gradient-premium-green rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-solar-textMuted font-medium">{pt.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medical & Vaccination Records */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <h3 className="text-sm font-bold text-solar-textPrimary mb-3">Pet Medical Profile & Schedules</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-solar-2xl bg-solar-elevated border border-solar-borderPrimary">
            <h4 className="text-xs font-bold text-solar-forest uppercase tracking-wider mb-2">Medical Conditions & Allergies</h4>
            <ul className="space-y-1 text-xs text-solar-textPrimary">
              {activePet.medicalConditions.map((cond, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-solar-gold" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-solar-2xl bg-solar-elevated border border-solar-borderPrimary">
            <h4 className="text-xs font-bold text-solar-forest uppercase tracking-wider mb-2">Feeding & Routine</h4>
            <p className="text-xs text-solar-textPrimary leading-relaxed">{activePet.feedingSchedule}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
