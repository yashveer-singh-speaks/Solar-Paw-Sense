'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Cpu, Users, Sun, HardDrive, Radio, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const AdminView: React.FC = () => {
  const { currentUser, allUsers, pets, collars, otaFirmwareList, triggerOTAUpdate, supportTickets } = useApp();
  const [selectedVersion, setSelectedVersion] = useState('v2.5.0-ai-heartbeat-beta');
  const [otaSuccess, setOtaSuccess] = useState('');

  if (currentUser?.role !== 'SUPER_ADMIN') {
    return (
      <div className="p-8 text-center bg-solar-card border border-solar-borderPrimary rounded-solar-3xl max-w-lg mx-auto">
        <AlertCircle className="w-8 h-8 text-solar-danger mx-auto mb-2" />
        <h3 className="text-sm font-bold text-solar-textPrimary">Access Restricted</h3>
        <p className="text-xs text-solar-textMuted mt-1">Super Admin credentials required (ekaa@superadminpaw.com).</p>
      </div>
    );
  }

  const handleBroadcastOTA = () => {
    triggerOTAUpdate(selectedVersion);
    setOtaSuccess(`Firmware broadcast ${selectedVersion} dispatched to all active collar microcontrollers.`);
    setTimeout(() => setOtaSuccess(''), 4000);
  };

  const collarList = Object.values(collars);

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Super Admin Header Banner */}
      <div className="p-5 rounded-solar-3xl bg-gradient-premium-green text-white shadow-solar-floating flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-solar-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-solar-gold" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Super Admin Platform OS</h2>
            <p className="text-xs text-solar-olive">Logged in as Ekaa ({currentUser.email})</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-solar-gold text-white">
          System Status: 100% Operational
        </span>
      </div>

      {otaSuccess && (
        <div className="p-4 rounded-solar-2xl bg-solar-success/15 border border-solar-success text-solar-success text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{otaSuccess}</span>
        </div>
      )}

      {/* Global Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted mb-1 flex items-center justify-between">
            <span>Total Registered Collars</span>
            <Radio className="w-4 h-4 text-solar-forest" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary">{collarList.length}</div>
          <div className="text-[10px] text-solar-success font-semibold mt-1">100% Online Sync</div>
        </div>

        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted mb-1 flex items-center justify-between">
            <span>Solar Energy Harvested</span>
            <Sun className="w-4 h-4 text-solar-gold" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary">8.0 Watts</div>
          <div className="text-[10px] text-solar-brass font-semibold mt-1">+24% Energy Surplus</div>
        </div>

        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted mb-1 flex items-center justify-between">
            <span>Registered Users</span>
            <Users className="w-4 h-4 text-solar-sage" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary">{allUsers.length}</div>
          <div className="text-[10px] text-solar-textMuted font-semibold mt-1">Pet Owners & Admins</div>
        </div>

        <div className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <div className="text-xs text-solar-textMuted mb-1 flex items-center justify-between">
            <span>Open Support Tickets</span>
            <AlertCircle className="w-4 h-4 text-solar-gold" />
          </div>
          <div className="text-2xl font-bold text-solar-textPrimary">{supportTickets.length}</div>
          <div className="text-[10px] text-solar-success font-semibold mt-1">Resolved SLAs</div>
        </div>
      </div>

      {/* OTA Firmware Update Manager */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <h3 className="text-sm font-bold text-solar-textPrimary mb-1 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-solar-gold" />
          Over-The-Air (OTA) Firmware Deployment Desk
        </h3>
        <p className="text-xs text-solar-textMuted mb-4">
          Push software updates directly to all active solar collar microcontrollers worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary rounded-solar-xl text-xs text-solar-textPrimary outline-none"
          >
            {otaFirmwareList.map((fw) => (
              <option key={fw.version} value={fw.version}>
                {fw.version} - {fw.description}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleBroadcastOTA}
            className="px-5 py-2.5 bg-solar-forest hover:bg-solar-moss text-white text-xs font-bold rounded-solar-xl shadow-solar-soft transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-solar-gold" />
            Broadcast OTA Payload
          </button>
        </div>
      </div>

      {/* Connected Collar Fleet Table */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
        <h3 className="text-sm font-bold text-solar-textPrimary mb-3">Collar Fleet Registry & Telemetry</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-solar-textPrimary">
            <thead className="border-b border-solar-borderPrimary text-[11px] text-solar-textMuted font-semibold">
              <tr>
                <th className="py-2">Collar Serial</th>
                <th className="py-2">Battery & Solar</th>
                <th className="py-2">Firmware</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solar-borderPrimary/60">
              {collarList.map((col) => (
                <tr key={col.id}>
                  <td className="py-3 font-mono font-semibold text-solar-forest">{col.serialNumber}</td>
                  <td className="py-3">
                    <span className="font-bold">{col.batteryPercentage}%</span> ({col.isSolarCharging ? `☀️ +${col.solarGainWatts}W` : 'Idle'})
                  </td>
                  <td className="py-3 font-mono text-solar-textSecondary">{col.firmwareVersion}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-solar-success/15 text-solar-success border border-solar-success/30">
                      {col.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
