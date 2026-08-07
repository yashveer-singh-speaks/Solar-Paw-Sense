'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, Sparkles, Heart, Sun, ShieldCheck, Activity, Lightbulb } from 'lucide-react';

export const AiCopilotView: React.FC = () => {
  const { activePet, activeTelemetry, activeCollar, aiChatMessages, sendAiMessage } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAiMessage(inputText.trim());
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    sendAiMessage(prompt);
  };

  if (!activePet) return null;

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-5 rounded-solar-3xl bg-gradient-warm-ivory border border-solar-borderPrimary shadow-solar-soft flex items-center gap-4">
        <div className="w-12 h-12 rounded-solar-2xl bg-solar-gold/15 border border-solar-gold/30 text-solar-brass flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-solar-textPrimary tracking-tight">Solar Paw Wellness AI Copilot</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-solar-gold/20 text-solar-brass uppercase">
              Notion AI Engine
            </span>
          </div>
          <p className="text-xs text-solar-textSecondary mt-0.5">
            Continuously analyzing {activePet.name}’s heart rate, solar harvest rate, AQI exposure, and stress index.
          </p>
        </div>
      </div>

      {/* Suggested AI Quick Prompts Pill List */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-solar-textMuted uppercase tracking-wider flex items-center gap-1.5 px-1">
          <Lightbulb className="w-3.5 h-3.5 text-solar-gold" /> Quick AI Health Diagnostics
        </span>

        <div className="flex flex-wrap gap-2">
          {[
            `Is ${activePet.name}’s heart rate normal today?`,
            `How much battery did solar harvest generate?`,
            `Evaluate Air Quality risk for evening walk`,
            `Generate printable Vet Medical Clearance Card`,
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className="px-3 py-1.5 rounded-solar-xl bg-solar-card border border-solar-borderPrimary hover:border-solar-gold text-solar-forest text-xs font-medium transition-all shadow-solar-soft"
            >
              ✨ {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="p-5 rounded-solar-3xl bg-solar-card border border-solar-borderPrimary shadow-solar-soft min-h-[340px] flex flex-col justify-between">
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {aiChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] p-4 rounded-solar-2xl text-xs leading-relaxed ${
                  msg.sender === 'USER'
                    ? 'bg-solar-forest text-white shadow-solar-soft'
                    : 'bg-solar-elevated border border-solar-borderPrimary text-solar-textPrimary shadow-solar-soft'
                }`}
              >
                {msg.sender === 'AI' && (
                  <div className="flex items-center gap-1.5 text-solar-gold font-semibold text-[11px] mb-1.5 pb-1 border-b border-solar-borderPrimary">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SolarPaw AI Medical Copilot</span>
                  </div>
                )}

                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-solar-borderPrimary/60 space-y-1.5">
                    <div className="text-[10px] font-bold text-solar-brass uppercase tracking-wider">
                      Recommended Actions:
                    </div>
                    {msg.recommendations.map((rec, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handlePromptClick(rec)}
                        className="block w-full text-left text-[11px] text-solar-forest font-medium hover:underline bg-solar-card/60 p-1.5 rounded-lg border border-solar-borderPrimary"
                      >
                        👉 {rec}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[9px] text-solar-textMuted mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Input Text Box */}
        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-solar-borderPrimary flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask AI Copilot about ${activePet.name}’s health, vitals, or solar status...`}
            className="flex-1 px-4 py-2.5 bg-solar-elevated border border-solar-borderPrimary focus:border-solar-gold rounded-solar-xl text-xs text-solar-textPrimary outline-none transition-colors"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="p-2.5 bg-solar-forest hover:bg-solar-moss text-white rounded-solar-xl transition-all shadow-solar-soft"
          >
            <Send className="w-4 h-4 text-solar-gold" />
          </button>
        </form>
      </div>
    </div>
  );
};
