'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Shield, Lock, Mail, Sparkles, CheckCircle2, ArrowRight, Smartphone } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('petowner@admin.com');
  const [password, setPassword] = useState('petowner.so.smart');
  const [errorMsg, setErrorMsg] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('7749');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpStep) {
      // Move to OTP verification step for luxury auth flow
      setOtpStep(true);
      return;
    }

    const success = login(email, password);
    if (!success) {
      setErrorMsg('Invalid email or password combination. Please check sample credentials.');
      setOtpStep(false);
    }
  };

  const handleQuickLogin = (role: 'ADMIN' | 'OWNER') => {
    if (role === 'ADMIN') {
      setEmail('ekaa@superadminpaw.com');
      setPassword('ekaa.not.so.smart');
      login('ekaa@superadminpaw.com', 'ekaa.not.so.smart');
    } else {
      setEmail('petowner@admin.com');
      setPassword('petowner.so.smart');
      login('petowner@admin.com', 'petowner.so.smart');
    }
  };

  return (
    <div className="min-h-screen bg-solar-bg flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Subtle organic solar glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-solar-gold/10 via-solar-sage/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-solar-card border border-solar-borderPrimary rounded-solar-3xl shadow-solar-floating p-6 sm:p-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <img
            src="https://ik.imagekit.io/yashveersinghrajpoot/solar_paw/logo.jpeg"
            alt="Solar Paw Sense Logo"
            className="w-16 h-16 mx-auto rounded-3xl object-cover shadow-solar-medium border border-solar-borderPrimary mb-4"
          />
          <h2 className="text-2xl font-bold text-solar-textPrimary tracking-tight">Solar Paw Sense</h2>
          <p className="text-xs text-solar-textSecondary mt-1 leading-relaxed">
            The Solar-Powered AI Operating System for Pet Healthcare & Safety
          </p>
        </div>

        {/* Preset Sample Credential Quick Selector */}
        <div className="mb-6 p-3 bg-solar-bgSecondary rounded-solar-2xl border border-solar-borderPrimary">
          <div className="text-[11px] font-semibold text-solar-textMuted uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-solar-gold" />
            1-Click Sample MVP Login
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('OWNER')}
              className="px-3 py-2 bg-solar-card border border-solar-borderPrimary hover:border-solar-gold rounded-xl text-left transition-all"
            >
              <div className="text-xs font-semibold text-solar-forest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-solar-gold" /> Pet Owner
              </div>
              <div className="text-[10px] text-solar-textMuted font-mono truncate">petowner@admin.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN')}
              className="px-3 py-2 bg-solar-card border border-solar-borderPrimary hover:border-solar-gold rounded-xl text-left transition-all"
            >
              <div className="text-xs font-semibold text-solar-brass flex items-center gap-1">
                <Shield className="w-3 h-3 text-solar-brass" /> Super Admin
              </div>
              <div className="text-[10px] text-solar-textMuted font-mono truncate">ekaa@superadminpaw.com</div>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-solar-danger/10 border border-solar-danger/30 text-solar-danger text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!otpStep ? (
            <>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-solar-textPrimary mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-solar-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl text-xs text-solar-textPrimary outline-none transition-colors"
                    placeholder="Enter email..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-solar-textPrimary mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-solar-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl text-xs text-solar-textPrimary outline-none transition-colors"
                    placeholder="Enter password..."
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3 text-center animate-in fade-in duration-200">
              <div className="w-10 h-10 mx-auto rounded-full bg-solar-gold/15 text-solar-brass flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-solar-textPrimary">2-Factor Security Verification</h4>
                <p className="text-xs text-solar-textMuted mt-0.5">
                  Enter 4-digit code sent to <span className="font-mono text-solar-forest">{email}</span>
                </p>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                {['7', '7', '4', '9'].map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-digit-${i}`}
                    aria-label={`OTP Digit ${i + 1}`}
                    type="text"
                    maxLength={1}
                    value={otpCode[i] || digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = otpCode.split('');
                      next[i] = val;
                      setOtpCode(next.join(''));
                    }}
                    className="w-12 h-12 text-center text-lg font-bold bg-solar-elevated border border-solar-gold rounded-xl text-solar-forest outline-none shadow-solar-soft"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-solar-forest hover:bg-[#183A2B] text-white text-xs font-semibold rounded-solar-xl transition-all shadow-solar-soft flex items-center justify-center gap-2 mt-2"
          >
            <span>{otpStep ? 'Verify & Authenticate' : 'Proceed to Account'}</span>
            <ArrowRight className="w-4 h-4 text-solar-gold" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-solar-borderPrimary text-center">
          <p className="text-[11px] text-solar-textMuted">
            🔒 100% Client-Side Local Storage Architecture • Zero Server Dependency
          </p>
        </div>
      </div>
    </div>
  );
};
