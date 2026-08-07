'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Heart, Flame, Wind, Moon, ShieldCheck, FileText, Download } from 'lucide-react';

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
