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

export default function Home() {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Modal States
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isSafeZoneModalOpen, setIsSafeZoneModalOpen] = useState(false);
  const [isVetExportModalOpen, setIsVetExportModalOpen] = useState(false);

  // If user is not logged in, show luxury AuthView
  if (!currentUser) {
    return <AuthView />;
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
