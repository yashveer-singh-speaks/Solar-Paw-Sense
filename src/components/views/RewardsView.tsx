'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Sun, Sparkles, CheckCircle2, Gift, ShoppingBag, Trophy, Flame } from 'lucide-react';
import { RewardItem } from '../../types';

export const RewardsView: React.FC = () => {
  const { activePet, rewards, redemptions, redeemReward } = useApp();
  const [successMsg, setSuccessMsg] = useState('');

  if (!activePet) return null;

  const handleRedeem = (item: RewardItem) => {
    const success = redeemReward(item);
    if (success) {
      setSuccessMsg(`Successfully redeemed ${item.title}! Voucher code saved to your wallet.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      alert(`Insufficient Paw Points. You need ${item.pointsCost - activePet.pawPoints} more points to unlock this reward.`);
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Paw Points Hero Card */}
      <div className="p-6 rounded-solar-3xl bg-gradient-luxury-gold text-white shadow-solar-floating relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30">
              Paw Points Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">{activePet.name}’s Balance</h2>
            <div className="text-3xl sm:text-4xl font-extrabold mt-1 text-white flex items-center gap-2">
              <span>{activePet.pawPoints.toLocaleString()}</span>
              <span className="text-sm font-semibold text-white/80">Paw Points</span>
            </div>
          </div>

          <div className="p-4 rounded-solar-2xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
            <div className="text-xs font-semibold flex items-center gap-1.5 text-white/90">
              <Flame className="w-4 h-4 text-white" />
              <span>Current Streak</span>
            </div>
            <div className="text-xl font-bold mt-0.5">14 Days Active</div>
            <div className="text-[10px] text-white/80 mt-0.5">+150 Points Daily Bonus</div>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-solar-2xl bg-solar-success/15 border border-solar-success text-solar-success text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Aesop Style Reward Store Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-solar-textPrimary flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-solar-forest" />
            Curated Rewards & Eco Accessories
          </h3>
          <span className="text-xs text-solar-textMuted">Redeem using solar activity points</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map((item) => {
            const canAfford = activePet.pawPoints >= item.pointsCost;
            return (
              <div
                key={item.id}
                className="p-4 rounded-solar-2xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft flex flex-col justify-between hover:border-solar-borderHover transition-all"
              >
                <div>
                  <div className="h-36 rounded-solar-xl overflow-hidden bg-solar-bgSecondary mb-3 relative">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-solar-card/90 text-solar-forest border border-solar-borderPrimary">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-solar-textPrimary leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-solar-textSecondary leading-relaxed mt-1">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-solar-borderPrimary flex items-center justify-between">
                  <div className="text-xs font-bold text-solar-forest">
                    {item.pointsCost.toLocaleString()} <span className="text-[10px] font-normal text-solar-textMuted">Points</span>
                  </div>

                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-solar-xl text-xs font-semibold transition-all ${
                      canAfford
                        ? 'bg-solar-forest text-white hover:bg-solar-moss shadow-solar-soft'
                        : 'bg-solar-bgSecondary text-solar-textMuted border border-solar-borderPrimary cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Reward' : 'Needs More Points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redemptions History */}
      {redemptions.length > 0 && (
        <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft">
          <h3 className="text-sm font-bold text-solar-textPrimary mb-3 flex items-center gap-2">
            <Gift className="w-4 h-4 text-solar-gold" />
            Redeemed Wallet Vouchers
          </h3>

          <div className="space-y-2">
            {redemptions.map((red) => (
              <div
                key={red.id}
                className="p-3 rounded-solar-2xl bg-solar-elevated border border-solar-borderPrimary flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-solar-textPrimary">{red.rewardTitle}</div>
                  <div className="text-[10px] text-solar-textMuted">Redeemed: {red.redeemedAt}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-solar-forest">{red.code}</div>
                  <div className="text-[10px] text-solar-brass font-medium">Ready for Use</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
