'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Heart, Wind, Flame, Footprints, BatteryCharging, Sparkles, MapPin, RefreshCw, FileText, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface DashboardViewProps {
  onOpenVetExportModal: () => void;
  onOpenSafeZoneModal: () => void;
  onNavigateToMap: () => void;
  onNavigateToAi: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenVetExportModal,
  onOpenSafeZoneModal,
  onNavigateToMap,
  onNavigateToAi,
}) => {
  const {
    activePet,
    activeTelemetry,
    activeCollar,
    toggleSolarCharging,
    triggerManualGpsSync,
    isLostPetMode,
    toggleLostPetMode,
  } = useApp();

  if (!activePet || !activeTelemetry || !activeCollar) return null;

  const stepPercentage = Math.min(100, Math.round((activeTelemetry.stepsToday / activePet.activityGoalSteps) * 100));

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Emergency Lost Pet Mode Banner if Active */}
      {isLostPetMode && (
        <div className="p-4 rounded-solar-2xl bg-solar-danger/15 border border-solar-danger text-solar-danger flex items-center justify-between shadow-solar-medium animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">🚨 Lost Pet Beacon Mode Active</h3>
              <p className="text-xs text-solar-textPrimary font-medium mt-0.5">
                High-power GPS broadcasting active for {activePet.name}. Collar battery dedicated to 5-sec position updates.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleLostPetMode}
            className="px-3 py-1.5 rounded-xl bg-solar-danger text-white text-xs font-bold shadow-solar-soft"
          >
            Deactivate
          </button>
        </div>
      )}

      {/* Hero Card: Pet Overview + Solar Energy Harvesting Orb */}
      <div className="relative overflow-hidden rounded-solar-3xl bg-gradient-warm-ivory border border-solar-borderPrimary p-5 sm:p-7 shadow-solar-floating">
        {/* Subtle background solar ring glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-solar-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Pet Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={activePet.photoUrl}
                alt={activePet.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-solar-2xl object-cover border-2 border-solar-gold shadow-solar-medium"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-solar-success text-white border-2 border-white flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-solar-textPrimary tracking-tight">{activePet.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-solar-forest/10 text-solar-forest border border-solar-forest/20">
                  {activePet.species} • {activePet.breed}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-solar-textSecondary mt-1">
                <span>Age: <strong>{activePet.ageYears} yrs</strong></span>
                <span>•</span>
                <span>Weight: <strong>{activePet.weightKg} kg</strong></span>
                <span>•</span>
                <span className="font-mono text-[11px] text-solar-textMuted">Chip: {activePet.microchipId.slice(-6)}</span>
              </div>

              {/* Badges Pill Row */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {activePet.badges.slice(0, 3).map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-solar-card border border-solar-borderPrimary text-solar-forest shadow-solar-soft"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Solar Energy Harvesting Status Orb */}
          <div className="w-full sm:w-auto p-4 rounded-solar-2xl bg-solar-card/90 backdrop-blur-xl border border-solar-borderPrimary shadow-solar-soft">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <div className="relative flex items-center justify-center">
                <Sun className={`w-10 h-10 ${activeCollar.isSolarCharging ? 'text-solar-gold animate-spin-slow' : 'text-solar-textMuted'}`} />
                {activeCollar.isSolarCharging && (
                  <div className="absolute inset-0 rounded-full bg-solar-gold/20 animate-ping opacity-30" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-solar-textMuted">
                  <Zap className="w-3.5 h-3.5 text-solar-gold" />
                  <span>Solar Harvest Efficiency</span>
                </div>

                <div className="text-lg font-bold text-solar-textPrimary flex items-center gap-2 mt-0.5">
                  <span>{activeCollar.isSolarCharging ? `${activeCollar.solarGainWatts} Watts` : 'Solar Idle'}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-solar-gold/15 text-solar-brass">
                    {activeCollar.batteryPercentage}% Charged
                  </span>
                </div>

                <div className="text-[11px] text-solar-textSecondary mt-0.5 flex items-center gap-2">
                  <span>Estimated Run: <strong>21 days</strong></span>
                  <button
                    type="button"
                    onClick={() => toggleSolarCharging(activePet.id)}
                    className="text-[10px] text-solar-forest underline font-semibold hover:text-solar-gold transition-colors"
                  >
                    {activeCollar.isSolarCharging ? 'Simulate Cloud Shade' : 'Simulate Sunlight'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notion AI Style Wellness Copilot Summary Pill */}
      <div
        onClick={onNavigateToAi}
        className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary hover:border-solar-gold/50 shadow-solar-soft cursor-pointer transition-all flex items-start gap-3"
      >
        <div className="p-2 rounded-xl bg-solar-gold/15 text-solar-brass flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-solar-forest flex items-center gap-1.5">
              Notion AI Wellness Insight
            </h3>
            <span className="text-[10px] text-solar-gold font-semibold underline">Ask AI Copilot →</span>
          </div>
          <p className="text-xs text-solar-textPrimary leading-relaxed mt-1">
            "Apollo's resting heart rate of <strong>74 BPM</strong> and <strong>AQI 42</strong> exposure indicate optimal cardiopulmonary recovery today. Solar charging output expanded battery backup by +18%."
          </p>
        </div>
      </div>

      {/* Real-time Vital Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Heart Rate BPM */}
        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="flex items-center justify-between text-solar-textMuted mb-2">
            <span className="text-xs font-medium">Heart Rate</span>
            <Heart className="w-4 h-4 text-solar-danger animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary tracking-tight">
            {activeTelemetry.heartRateBpm} <span className="text-xs font-normal text-solar-textMuted">BPM</span>
          </div>
          <div className="text-[10px] text-solar-success font-medium mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Normal Resting Range
          </div>
        </div>

        {/* Body Temp */}
        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="flex items-center justify-between text-solar-textMuted mb-2">
            <span className="text-xs font-medium">Body Temp</span>
            <Flame className="w-4 h-4 text-solar-gold" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary tracking-tight">
            {activeTelemetry.bodyTempCelsius}° <span className="text-xs font-normal text-solar-textMuted">C</span>
          </div>
          <div className="text-[10px] text-solar-forest font-medium mt-1">
            Optimal (38.0°–39.2°)
          </div>
        </div>

        {/* Air Quality Index */}
        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="flex items-center justify-between text-solar-textMuted mb-2">
            <span className="text-xs font-medium">Air Quality</span>
            <Wind className="w-4 h-4 text-solar-sage" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary tracking-tight">
            AQI {activeTelemetry.airQualityAqi}
          </div>
          <div className="text-[10px] text-solar-success font-medium mt-1">
            🌿 Fresh Pure Air
          </div>
        </div>

        {/* Daily Step Progress */}
        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="flex items-center justify-between text-solar-textMuted mb-2">
            <span className="text-xs font-medium">Daily Steps</span>
            <Footprints className="w-4 h-4 text-solar-forest" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary tracking-tight">
            {activeTelemetry.stepsToday.toLocaleString()}
          </div>
          <div className="w-full bg-solar-bgSecondary rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-solar-gold h-full rounded-full transition-all duration-500" style={{ width: `${stepPercentage}%` }} />
          </div>
          <div className="text-[10px] text-solar-textMuted mt-1 flex justify-between">
            <span>{stepPercentage}% of Goal</span>
            <span>{activeTelemetry.distanceKm} km</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Quick View & Geofence Status */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-solar-textPrimary flex items-center gap-2">
              <MapPin className="w-4 h-4 text-solar-forest" />
              Live GPS & Geofence Protection
            </h3>
            <p className="text-xs text-solar-textMuted">Last position updated {activeCollar.lastGpsUpdate}</p>
          </div>

          <button
            type="button"
            onClick={onNavigateToMap}
            className="px-3 py-1.5 rounded-xl bg-solar-forest text-white text-xs font-semibold hover:bg-solar-moss transition-colors shadow-solar-soft"
          >
            View Full Map →
          </button>
        </div>

        {/* Map Preview Graphic */}
        <div
          onClick={onNavigateToMap}
          className="relative h-44 rounded-solar-2xl overflow-hidden bg-solar-bgSecondary border border-solar-borderPrimary cursor-pointer group flex items-center justify-center"
        >
          {/* Simulated Satellite Map Grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#DDD6C9_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

          {/* Safe Zone Circle */}
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-solar-forest/40 bg-solar-forest/5 flex items-center justify-center animate-solar-pulse">
            {/* Pet Marker Pin */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-2 border-solar-gold shadow-solar-floating overflow-hidden bg-white">
                <img src={activePet.photoUrl} alt={activePet.name} className="w-full h-full object-cover" />
              </div>
              <span className="px-2 py-0.5 rounded-md bg-solar-forest text-white text-[9px] font-bold mt-1 shadow-solar-soft">
                {activePet.name} (Safe)
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-solar-card/90 backdrop-blur-md border border-solar-borderPrimary text-[11px] font-semibold text-solar-forest">
            🔒 Home Sanctuary Safe Zone (180m)
          </div>
        </div>
      </div>

      {/* Quick Action Pill Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="button"
          onClick={triggerManualGpsSync}
          className="flex-1 min-w-[140px] py-2.5 px-4 rounded-solar-xl bg-solar-card border border-solar-borderPrimary hover:border-solar-gold text-solar-forest text-xs font-semibold flex items-center justify-center gap-2 shadow-solar-soft transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-solar-gold" />
          Refresh High-Precision GPS
        </button>

        <button
          type="button"
          onClick={onOpenVetExportModal}
          className="flex-1 min-w-[140px] py-2.5 px-4 rounded-solar-xl bg-solar-card border border-solar-borderPrimary hover:border-solar-gold text-solar-forest text-xs font-semibold flex items-center justify-center gap-2 shadow-solar-soft transition-all"
        >
          <FileText className="w-3.5 h-3.5 text-solar-gold" />
          Export Vet Health Card
        </button>

        <button
          type="button"
          onClick={onOpenSafeZoneModal}
          className="flex-1 min-w-[140px] py-2.5 px-4 rounded-solar-xl bg-solar-card border border-solar-borderPrimary hover:border-solar-gold text-solar-forest text-xs font-semibold flex items-center justify-center gap-2 shadow-solar-soft transition-all"
        >
          <MapPin className="w-3.5 h-3.5 text-solar-gold" />
          Configure Safe Zones
        </button>
      </div>
    </div>
  );
};
