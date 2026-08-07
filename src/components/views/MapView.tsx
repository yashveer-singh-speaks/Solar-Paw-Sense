'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, ShieldCheck, Sun, AlertTriangle, Layers, Plus, Compass, BatteryCharging } from 'lucide-react';

interface MapViewProps {
  onOpenSafeZoneModal: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ onOpenSafeZoneModal }) => {
  const { activePet, activeCollar, safeZones, toggleSafeZone, isLostPetMode, toggleLostPetMode, triggerManualGpsSync } = useApp();
  const [selectedMapMode, setSelectedMapMode] = useState<'standard' | 'satellite' | 'terrain'>('standard');

  if (!activePet || !activeCollar) return null;

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Map Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-solar-card border border-solar-borderPrimary p-4 rounded-solar-2xl shadow-solar-soft">
        <div>
          <h2 className="text-lg font-bold text-solar-textPrimary flex items-center gap-2">
            <Compass className="w-5 h-5 text-solar-forest" />
            Live GPS Telemetry & Geofence Protection
          </h2>
          <p className="text-xs text-solar-textMuted">
            Collar ID: <span className="font-mono text-solar-forest">{activeCollar.serialNumber}</span> • {activeCollar.lastGpsUpdate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Map Layer Mode Selector */}
          <div className="flex bg-solar-bgSecondary p-1 rounded-xl border border-solar-borderPrimary text-xs font-medium">
            {(['standard', 'satellite'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSelectedMapMode(mode)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  selectedMapMode === mode ? 'bg-solar-forest text-white shadow-solar-soft' : 'text-solar-textSecondary'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={triggerManualGpsSync}
            className="p-2 rounded-xl bg-solar-card border border-solar-borderPrimary hover:border-solar-gold text-solar-forest transition-colors"
            title="Refresh GPS Signal"
            aria-label="Refresh GPS Signal"
          >
            <Navigation className="w-4 h-4 text-solar-gold" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Map Simulator */}
      <div className="relative h-[420px] rounded-solar-3xl overflow-hidden border border-solar-borderPrimary shadow-solar-floating bg-[#EFECE6]">
        {/* Simulated Map Visual Canvas */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            selectedMapMode === 'satellite'
              ? 'bg-[#1C2520] opacity-90'
              : 'bg-[#F2EEE7] bg-[radial-gradient(#CDBF9E_1.5px,transparent_1.5px)] [background-size:24px_24px]'
          }`}
        >
          {/* Simulated Park/Road Grid Overlay */}
          <div className="absolute inset-0 border-t-8 border-b-8 border-dashed border-solar-olive/20 my-auto h-24 rotate-12" />
          <div className="absolute inset-0 border-l-8 border-r-8 border-dashed border-solar-olive/20 mx-auto w-24 -rotate-12" />
          
          {/* Park Greenery Area */}
          <div className="absolute top-12 left-16 w-48 h-48 rounded-full bg-solar-sage/20 border border-solar-sage/40 flex items-center justify-center">
            <span className="text-[10px] font-bold text-solar-forest uppercase tracking-widest opacity-60">
              Central Park Dog Run
            </span>
          </div>

          {/* Active Safe Zone Geofence Circle */}
          {safeZones.filter((sz) => sz.isActive).map((sz) => (
            <div
              key={sz.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-solar-forest border-dashed bg-solar-forest/10 flex items-center justify-center animate-solar-pulse pointer-events-none"
            >
              <div className="text-[10px] font-bold text-solar-forest bg-solar-card/90 px-2 py-0.5 rounded-full border border-solar-borderPrimary shadow-solar-soft absolute top-3">
                🔒 {sz.name} ({sz.radiusMeters}m)
              </div>
            </div>
          ))}

          {/* Pet Animated Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
            {/* Live Pulsing Beacon Ring */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-solar-gold shadow-solar-floating overflow-hidden bg-white p-0.5 relative z-10">
                <img src={activePet.photoUrl} alt={activePet.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute inset-0 rounded-full bg-solar-gold/40 animate-ping" />
            </div>

            {/* Pet Status Label Badge */}
            <div className="mt-2 px-3 py-1 rounded-solar-xl bg-solar-forest text-white text-xs font-semibold shadow-solar-medium flex items-center gap-1.5 border border-solar-moss">
              <span className="w-2 h-2 rounded-full bg-solar-gold animate-pulse" />
              <span>{activePet.name}</span>
              <span className="text-[10px] text-solar-olive font-mono">({activeCollar.batteryPercentage}%)</span>
            </div>
          </div>
        </div>

        {/* Floating Map Controls */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
          <div className="px-3 py-1.5 rounded-solar-xl bg-solar-card/90 backdrop-blur-md border border-solar-borderPrimary shadow-solar-soft text-xs font-semibold text-solar-textPrimary flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-solar-gold animate-pulse" />
            <span>Solar Harvest: {activeCollar.solarGainWatts}W</span>
          </div>

          {isLostPetMode && (
            <div className="px-3 py-1.5 rounded-solar-xl bg-solar-danger text-white text-xs font-bold shadow-solar-medium animate-pulse flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Lost Pet Mode Broadcast Active!
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLostPetMode}
            className={`px-3 py-2 rounded-solar-xl text-xs font-bold shadow-solar-medium transition-all ${
              isLostPetMode
                ? 'bg-solar-danger text-white'
                : 'bg-solar-card/90 backdrop-blur-md border border-solar-borderPrimary text-solar-danger hover:bg-solar-danger hover:text-white'
            }`}
          >
            {isLostPetMode ? 'Deactivate Lost Mode' : '🚨 Trigger Lost Pet Emergency'}
          </button>
        </div>
      </div>

      {/* Safe Zones List & Controls */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-solar-textPrimary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-solar-forest" />
              Configured Safe Zones
            </h3>
            <p className="text-xs text-solar-textMuted">Receive instant notifications if {activePet.name} exits these geofence boundaries.</p>
          </div>

          <button
            type="button"
            onClick={onOpenSafeZoneModal}
            className="px-3 py-1.5 rounded-xl bg-solar-forest text-white text-xs font-semibold flex items-center gap-1 shadow-solar-soft hover:bg-solar-moss transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Safe Zone
          </button>
        </div>

        <div className="space-y-2.5">
          {safeZones.map((sz) => (
            <div
              key={sz.id}
              className="p-3.5 rounded-solar-2xl bg-solar-elevated border border-solar-borderPrimary flex items-center justify-between gap-3 hover:border-solar-borderHover transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${sz.isActive ? 'bg-solar-forest/10 text-solar-forest' : 'bg-solar-bgSecondary text-solar-textMuted'}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-solar-textPrimary">{sz.name}</h4>
                  <p className="text-[11px] text-solar-textSecondary">
                    Radius: <strong>{sz.radiusMeters} meters</strong> • Alert on Exit: {sz.alertOnExit ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleSafeZone(sz.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  sz.isActive
                    ? 'bg-solar-forest/15 text-solar-forest border border-solar-forest/30'
                    : 'bg-solar-bgSecondary text-solar-textMuted border border-solar-borderPrimary'
                }`}
              >
                {sz.isActive ? 'Active' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
