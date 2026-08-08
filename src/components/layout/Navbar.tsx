'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Shield, Bell, ChevronDown, Plus, LogOut, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPetModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPetModal }) => {
  const {
    currentUser,
    pets,
    activePetId,
    setActivePetId,
    activePet,
    activeCollar,
    switchUserRole,
    logout,
    alerts,
    markAlertRead,
    isLostPetMode,
    toggleLostPetMode,
  } = useApp();

  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  const unreadAlerts = alerts.filter((a) => !a.isRead);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-solar-borderPrimary px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <img
            src="https://ik.imagekit.io/yashveersinghrajpoot/solar_paw/logo.jpeg"
            alt="Solar Paw Sense Logo"
            className="w-10 h-10 rounded-2xl object-cover shadow-solar-soft border border-solar-borderPrimary"
          />
          <div className="hidden md:block">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-semibold text-solar-textPrimary tracking-tight">Solar Paw Sense</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-solar-gold/15 text-solar-brass border border-solar-gold/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-solar-textMuted hidden sm:block">AI & Solar Assisted Pet Operating System</p>
          </div>
        </div>

        {/* Center / Middle Controls: Pet Switcher & Solar Status Pill */}
        {currentUser?.role === 'PET_OWNER' && activePet && (
          <div className="flex items-center gap-2">
            {/* Active Pet Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPetDropdown(!showPetDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-solar-card border border-solar-borderPrimary hover:border-solar-borderHover transition-all shadow-solar-soft"
              >
                <img
                  src={activePet.photoUrl}
                  alt={activePet.name}
                  className="w-6 h-6 rounded-full object-cover border border-solar-borderPrimary"
                />
                <span className="text-xs sm:text-sm font-medium text-solar-textPrimary hidden sm:inline">{activePet.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-solar-textMuted" />
              </button>

              {showPetDropdown && (
                <div className="absolute left-0 mt-2 w-52 bg-solar-card border border-solar-borderPrimary rounded-solar-xl shadow-solar-floating p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-semibold text-solar-textMuted px-2 py-1 uppercase tracking-wider">
                    Select Active Pet
                  </div>
                  {pets.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => {
                        setActivePetId(pet.id);
                        setShowPetDropdown(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                        pet.id === activePetId
                          ? 'bg-solar-forest text-white'
                          : 'text-solar-textPrimary hover:bg-solar-bgSecondary'
                      }`}
                    >
                      <img src={pet.photoUrl} alt={pet.name} className="w-5 h-5 rounded-full object-cover" />
                      <div className="flex-1 text-left">
                        <div>{pet.name}</div>
                        <div className={`text-[10px] ${pet.id === activePetId ? 'text-solar-olive' : 'text-solar-textMuted'}`}>
                          {pet.breed}
                        </div>
                      </div>
                    </button>
                  ))}

                  <div className="border-t border-solar-borderPrimary my-1 pt-1">
                    <button
                      onClick={() => {
                        setShowPetDropdown(false);
                        onOpenPetModal();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs text-solar-forest font-medium rounded-xl hover:bg-solar-bgSecondary transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-solar-gold" />
                      Add New Pet
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Solar Charging Indicator Pill */}
            {activeCollar && (
              <div
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs font-medium transition-all ${
                  activeCollar.isSolarCharging
                    ? 'bg-solar-gold/10 border-solar-gold/40 text-solar-brass'
                    : 'bg-solar-bgSecondary border-solar-borderPrimary text-solar-textSecondary'
                }`}
              >
                <Sun className={`w-3.5 h-3.5 ${activeCollar.isSolarCharging ? 'text-solar-gold animate-pulse' : 'text-solar-textMuted'}`} />
                <span>
                  {activeCollar.isSolarCharging
                    ? `☀️ Solar Harvest ${activeCollar.solarGainWatts}W (${activeCollar.batteryPercentage}%)`
                    : `Battery ${activeCollar.batteryPercentage}%`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Right Section: Role Switcher, Emergency Lost Mode, Alerts, Avatar & Logout */}
        <div className="flex items-center gap-2">
          {/* Quick Role Switcher Pill for Demo */}
          <button
            onClick={() => switchUserRole(currentUser?.role === 'SUPER_ADMIN' ? 'PET_OWNER' : 'SUPER_ADMIN')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl text-xs font-medium bg-solar-bgSecondary border border-solar-borderPrimary hover:border-solar-gold/50 text-solar-forest transition-colors"
            title="Click to toggle between Super Admin and Pet Owner roles"
          >
            {currentUser?.role === 'SUPER_ADMIN' ? (
              <>
                <Cpu className="w-3.5 h-3.5 text-solar-gold" />
                <span className="hidden sm:inline">Role: <span className="font-bold text-solar-gold">Admin</span></span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-solar-forest" />
                <span className="hidden sm:inline">Role: <span className="font-bold text-solar-forest">Owner</span></span>
              </>
            )}
          </button>

          {/* Emergency Lost Pet Mode Toggle */}
          {currentUser?.role === 'PET_OWNER' && (
            <button
              onClick={toggleLostPetMode}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-solar-soft ${
                isLostPetMode
                  ? 'bg-solar-danger text-white animate-pulse'
                  : 'bg-solar-card border border-solar-borderPrimary hover:border-solar-danger/40 text-solar-danger'
              }`}
              title="Activate High-Frequency Lost Pet Beacon Mode"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isLostPetMode ? 'Lost Mode Active!' : 'Lost Pet Mode'}</span>
            </button>
          )}

          {/* Alerts Bell Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="p-2 rounded-2xl bg-solar-card border border-solar-borderPrimary hover:border-solar-borderHover transition-colors relative"
            >
              <Bell className="w-4 h-4 text-solar-textSecondary" />
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-solar-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {showAlertsDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-solar-card border border-solar-borderPrimary rounded-solar-2xl shadow-solar-floating p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-solar-borderPrimary pb-2 mb-2">
                  <h3 className="text-xs font-semibold text-solar-textPrimary flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-solar-gold" />
                    Collar Notifications
                  </h3>
                  <span className="text-[10px] text-solar-textMuted">{alerts.length} total</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {alerts.length === 0 ? (
                    <p className="text-xs text-solar-textMuted py-4 text-center">No recent notifications</p>
                  ) : (
                    alerts.map((alt) => (
                      <div
                        key={alt.id}
                        onClick={() => markAlertRead(alt.id)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          alt.isRead
                            ? 'bg-solar-bg/50 border-solar-borderPrimary text-solar-textSecondary'
                            : 'bg-solar-card border-solar-gold/40 text-solar-textPrimary font-medium'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-solar-forest">{alt.title}</span>
                          <span className="text-[9px] text-solar-textMuted">{alt.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-solar-textSecondary leading-snug">{alt.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Logout */}
          <div className="flex items-center gap-2 pl-1 border-l border-solar-borderPrimary">
            <img
              src={currentUser?.avatarUrl}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover border border-solar-gold/50 shadow-solar-soft"
            />
            <button
              onClick={logout}
              className="p-1.5 rounded-xl text-solar-textMuted hover:text-solar-danger hover:bg-solar-bgSecondary transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
