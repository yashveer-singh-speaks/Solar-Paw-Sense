'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { BottomNav, TabType } from '../components/layout/BottomNav';
import { AuthView } from '../components/views/AuthView';
import { DashboardView } from '../components/views/DashboardView';
import { MapView } from '../components/views/MapView';
import { AiCopilotView } from '../components/views/AiCopilotView';
import { WellnessView } from '../components/views/WellnessView';
import { RewardsView } from '../components/views/RewardsView';
import { AdminView } from '../components/views/AdminView';
import { PetModal } from '../components/modals/PetModal';
import { AddSafeZoneModal } from '../components/modals/AddSafeZoneModal';
import { VetExportModal } from '../components/modals/VetExportModal';
import { Sparkles, Shield, LogOut } from 'lucide-react';

export default function Home() {
  const { currentUser, pets, logout } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Modal States
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isSafeZoneModalOpen, setIsSafeZoneModalOpen] = useState(false);
  const [isVetExportModalOpen, setIsVetExportModalOpen] = useState(false);

  // 1. Mandatory Auth Check: If user is not logged in, show AuthView
  if (!currentUser) {
    return <AuthView />;
  }

  // 2. Mandatory Pet Onboarding Check: If pet owner has 0 pets registered, require initial Pet Registration
  const userHasPet = pets.length > 0;
  if (currentUser.role === 'PET_OWNER' && !userHasPet) {
    return (
      <div className="min-h-screen bg-solar-bg flex flex-col justify-between items-center p-4 relative overflow-hidden">
        {/* Organic Solar Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-solar-gold/15 via-solar-sage/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Minimal Header */}
        <header className="w-full max-w-4xl flex items-center justify-between py-4 relative z-10">
          <div className="flex items-center gap-3">
            <img
              src="https://ik.imagekit.io/yashveersinghrajpoot/solar_paw/logo.jpeg"
              alt="Solar Paw Sense Logo"
              className="w-10 h-10 rounded-2xl object-cover border border-solar-borderPrimary shadow-solar-soft"
            />
            <div>
              <h1 className="text-sm font-bold text-solar-textPrimary">Solar Paw Sense</h1>
              <p className="text-[11px] text-solar-textMuted">Welcome, {currentUser.name}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-solar-card border border-solar-borderPrimary text-solar-textSecondary text-xs hover:text-solar-danger transition-colors shadow-solar-soft"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </header>

        {/* Mandatory Onboarding Modal Modal */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center my-6">
          <PetModal isOpen={true} onClose={() => {}} isMandatory={true} />
        </div>

        {/* Footer */}
        <footer className="text-[11px] text-solar-textMuted py-2 text-center relative z-10">
          ✨ Step 2 of 2: Add your pet to initialize solar collar telemetry & AI diagnostics
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-solar-bg flex flex-col justify-between selection:bg-solar-gold/30">
      {/* Top Navbar */}
      <Navbar onOpenPetModal={() => setIsPetModalOpen(true)} />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6">
        {currentUser.role === 'SUPER_ADMIN' && activeTab === 'admin' ? (
          <AdminView />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                onOpenVetExportModal={() => setIsVetExportModalOpen(true)}
                onOpenSafeZoneModal={() => setIsSafeZoneModalOpen(true)}
                onNavigateToMap={() => setActiveTab('map')}
                onNavigateToAi={() => setActiveTab('ai')}
              />
            )}
            {activeTab === 'map' && (
              <MapView onOpenSafeZoneModal={() => setIsSafeZoneModalOpen(true)} />
            )}
            {activeTab === 'ai' && <AiCopilotView />}
            {activeTab === 'wellness' && (
              <WellnessView onOpenVetExportModal={() => setIsVetExportModalOpen(true)} />
            )}
            {activeTab === 'rewards' && <RewardsView />}
          </>
        )}
      </main>

      {/* Mobile-First Floating Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <PetModal isOpen={isPetModalOpen} onClose={() => setIsPetModalOpen(false)} />
      <AddSafeZoneModal isOpen={isSafeZoneModalOpen} onClose={() => setIsSafeZoneModalOpen(false)} />
      <VetExportModal isOpen={isVetExportModalOpen} onClose={() => setIsVetExportModalOpen(false)} />
    </div>
  );
}
