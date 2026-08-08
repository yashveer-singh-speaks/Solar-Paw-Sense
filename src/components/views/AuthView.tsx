'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, Mail, Sparkles, CheckCircle2, ArrowRight, Smartphone, User as UserIcon } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, createAccount } = useApp();
  const [authMode, setAuthMode] = useState<'SIGN_IN' | 'CREATE_ACCOUNT'>('SIGN_IN');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('petowner@admin.com');
  const [password, setPassword] = useState('petowner.so.smart');
  const [errorMsg, setErrorMsg] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('7749');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'CREATE_ACCOUNT') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!email.trim() || !password) {
        setErrorMsg('Please provide a valid email and password.');
        return;
      }
      const success = createAccount(fullName, email, password);
      if (!success) {
        setErrorMsg('Account creation failed. Please check your credentials.');
      }
      return;
    }

    // SIGN_IN mode
    if (!otpStep) {
      setOtpStep(true);
      return;
    }

    const success = login(email, password);
    if (!success) {
      setErrorMsg('Invalid email or password combination. Please check sample credentials or create a new account.');
      setOtpStep(false);
    }
  };

  const handleQuickLogin = (role: 'ADMIN' | 'OWNER') => {
    setAuthMode('SIGN_IN');
    setOtpStep(false);
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
        <div className="text-center mb-6">
          <img
            src="https://ik.imagekit.io/yashveersinghrajpoot/solar_paw/logo.jpeg"
            alt="Solar Paw Sense Logo"
            className="w-16 h-16 mx-auto rounded-3xl object-cover shadow-solar-medium border border-solar-borderPrimary mb-3"
          />
          <h2 className="text-2xl font-bold text-solar-textPrimary tracking-tight">Solar Paw Sense</h2>
          <p className="text-xs text-solar-textSecondary mt-1 leading-relaxed">
            The Solar-Powered AI Operating System for Pet Healthcare & Safety
          </p>
        </div>

        {/* Preset Sample Credential Quick Selector */}
        <div className="mb-5 p-3 bg-solar-bgSecondary rounded-solar-2xl border border-solar-borderPrimary">
          <div className="text-[11px] font-semibold text-solar-textMuted uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-solar-gold" />
              1-Click Demo Login
            </span>
            <span className="text-[10px] text-solar-brass font-normal">Instant Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('OWNER')}
              className="px-3 py-2 bg-solar-card border border-solar-borderPrimary hover:border-solar-gold rounded-xl text-left transition-all shadow-solar-soft"
            >
              <div className="text-xs font-semibold text-solar-forest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-solar-gold" /> Pet Owner
              </div>
              <div className="text-[10px] text-solar-textMuted font-mono truncate">petowner@admin.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN')}
              className="px-3 py-2 bg-solar-card border border-solar-borderPrimary hover:border-solar-gold rounded-xl text-left transition-all shadow-solar-soft"
            >
              <div className="text-xs font-semibold text-solar-brass flex items-center gap-1">
                <Shield className="w-3 h-3 text-solar-brass" /> Super Admin
              </div>
              <div className="text-[10px] text-solar-textMuted font-mono truncate">ekaa@superadminpaw.com</div>
            </button>
          </div>
        </div>

        {/* Auth Mode Toggle Tabs (Sign In vs Create Account) */}
        <div className="flex bg-solar-elevated p-1 rounded-solar-xl border border-solar-borderPrimary mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthMode('SIGN_IN');
              setOtpStep(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'SIGN_IN'
                ? 'bg-solar-card text-solar-forest shadow-solar-soft border border-solar-borderPrimary'
                : 'text-solar-textMuted hover:text-solar-textPrimary'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('CREATE_ACCOUNT');
              setOtpStep(false);
              setErrorMsg('');
              setEmail('');
              setPassword('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'CREATE_ACCOUNT'
                ? 'bg-solar-card text-solar-forest shadow-solar-soft border border-solar-borderPrimary'
                : 'text-solar-textMuted hover:text-solar-textPrimary'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-solar-danger/10 border border-solar-danger/30 text-solar-danger text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'CREATE_ACCOUNT' ? (
            <>
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-solar-textPrimary mb-1.5">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-solar-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl text-xs text-solar-textPrimary outline-none transition-colors"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="createEmail" className="block text-xs font-semibold text-solar-textPrimary mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-solar-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="createEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl text-xs text-solar-textPrimary outline-none transition-colors"
                    placeholder="Enter email address..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="createPassword" className="block text-xs font-semibold text-solar-textPrimary mb-1.5">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-solar-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="createPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl text-xs text-solar-textPrimary outline-none transition-colors"
                    placeholder="Set account password..."
                  />
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-solar-forest hover:bg-[#183A2B] text-white text-xs font-semibold rounded-solar-xl transition-all shadow-solar-soft flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {authMode === 'CREATE_ACCOUNT'
                ? 'Create Account & Continue'
                : otpStep
                ? 'Verify & Authenticate'
                : 'Proceed to Account'}
            </span>
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
