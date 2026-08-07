'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, ShieldCheck } from 'lucide-react';

interface AddSafeZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSafeZoneModal: React.FC<AddSafeZoneModalProps> = ({ isOpen, onClose }) => {
  const { activePet, activeCollar, addSafeZone } = useApp();
  const [name, setName] = useState('');
  const [radiusMeters, setRadiusMeters] = useState('200');

  if (!isOpen || !activePet || !activeCollar) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSafeZone({
      petId: activePet.id,
      name: name.trim(),
      latitude: activeCollar.latitude,
      longitude: activeCollar.longitude,
      radiusMeters: parseInt(radiusMeters) || 200,
      isActive: true,
      alertOnExit: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-solar-card border border-solar-borderPrimary rounded-solar-3xl shadow-solar-floating p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-solar-textMuted hover:text-solar-forest hover:bg-solar-bgSecondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-solar-forest" />
          <h3 className="text-base font-bold text-solar-textPrimary">Create New Geofence Safe Zone</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-solar-textPrimary mb-1">Zone Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Dog Park or Beach Sanctuary"
              className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-solar-textPrimary mb-1">Geofence Radius (Meters)</label>
            <select
              value={radiusMeters}
              onChange={(e) => setRadiusMeters(e.target.value)}
              className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary rounded-solar-xl outline-none"
            >
              <option value="100">100 meters (Home Yard)</option>
              <option value="200">200 meters (Neighborhood)</option>
              <option value="500">500 meters (Park Run)</option>
              <option value="1000">1000 meters (Open Nature)</option>
            </select>
          </div>

          <div className="p-3 bg-solar-bgSecondary rounded-solar-2xl border border-solar-borderPrimary text-[11px] text-solar-textSecondary">
            📍 Safe Zone coordinates will center around {activePet.name}'s live collar GPS position ({activeCollar.latitude.toFixed(4)}, {activeCollar.longitude.toFixed(4)}).
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-solar-forest hover:bg-solar-moss text-white font-bold rounded-solar-xl shadow-solar-soft flex items-center justify-center gap-1.5 transition-all"
            >
              <MapPin className="w-4 h-4 text-solar-gold" /> Save Safe Zone Boundary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
