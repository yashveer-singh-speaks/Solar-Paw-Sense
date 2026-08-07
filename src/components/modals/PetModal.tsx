'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Sparkles } from 'lucide-react';

interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PetModal: React.FC<PetModalProps> = ({ isOpen, onClose }) => {
  const { addPet } = useApp();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Dog' | 'Cat' | 'Other'>('Dog');
  const [breed, setBreed] = useState('');
  const [ageYears, setAgeYears] = useState('2');
  const [weightKg, setWeightKg] = useState('14');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim()) return;

    addPet({
      name: name.trim(),
      species,
      breed: breed.trim(),
      ageYears: parseFloat(ageYears) || 2,
      weightKg: parseFloat(weightKg) || 10,
      photoUrl,
      microchipId: `985141${Math.floor(10000000 + Math.random() * 90000000)}`,
      medicalConditions: ['Routine Vet Check Complete'],
      feedingSchedule: 'Standard daily kibble (Morning & Evening)',
      collarId: '',
      activityGoalSteps: 8000,
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
          <Sparkles className="w-5 h-5 text-solar-gold" />
          <h3 className="text-base font-bold text-solar-textPrimary">Register New Pet & Solar Collar</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-solar-textPrimary mb-1">Pet Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Rocky"
              className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-solar-textPrimary mb-1">Species</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as any)}
                className="w-full px-3 py-2 bg-solar-elevated border border-solar-borderPrimary rounded-solar-xl outline-none"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-solar-textPrimary mb-1">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
                placeholder="e.g. Labrador"
                className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-solar-textPrimary mb-1">Age (Years)</label>
              <input
                type="number"
                step="0.5"
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary rounded-solar-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-solar-textPrimary mb-1">Weight (Kg)</label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary rounded-solar-xl outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-solar-textPrimary mb-1">Photo URL</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-3.5 py-2 bg-solar-elevated border border-solar-borderPrimary rounded-solar-xl outline-none text-[11px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-solar-forest hover:bg-solar-moss text-white font-bold rounded-solar-xl shadow-solar-soft flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-solar-gold" /> Add Pet & Auto-Pair Solar Collar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
