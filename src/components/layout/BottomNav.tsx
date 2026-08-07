'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, MapPin, Bot, Activity, Award, ShieldCheck } from 'lucide-react';

export type TabType = 'dashboard' | 'map' | 'ai' | 'wellness' | 'rewards' | 'admin';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useApp();

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Live Map', icon: MapPin },
    { id: 'ai', label: 'AI Copilot', icon: Bot },
    { id: 'wellness', label: 'Wellness', icon: Activity },
    { id: 'rewards', label: 'Rewards', icon: Award },
  ];

  if (currentUser?.role === 'SUPER_ADMIN') {
    tabs.push({ id: 'admin', label: 'Admin Portal', icon: ShieldCheck });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:pb-4 pointer-events-none flex justify-center">
      <div className="pointer-events-auto max-w-lg w-full bg-solar-card/90 backdrop-blur-2xl border border-solar-borderPrimary rounded-full shadow-solar-floating px-2 py-1.5 flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex flex-col items-center py-1.5 px-2 rounded-full transition-all duration-200 relative ${
                isActive
                  ? 'bg-solar-forest text-white shadow-solar-soft'
                  : 'text-solar-textSecondary hover:text-solar-forest hover:bg-solar-bgSecondary/60'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isActive ? 'scale-110 text-solar-gold' : ''}`} />
              <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-solar-gold rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
