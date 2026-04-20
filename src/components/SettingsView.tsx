import React, { useState } from 'react';
import { LANGUAGE_OPTIONS, APP_STEP } from '../constants/app';
import type { WordEntry, AppStep } from '../types';

interface SettingsViewProps {
  apiKey: string;
  targetLanguage: string;
  history: WordEntry[];
  onSaveKey: (key: string) => void;
  onClearKey: () => void;
  onSetLanguage: (lang: string) => void;
  onNavigate: (step: AppStep) => void;
}

const SettingsView = ({
  apiKey,
  targetLanguage,
  history,
  onSaveKey,
  onClearKey,
  onSetLanguage,
  onNavigate
}: SettingsViewProps) => {
  const [activeTab, setActiveTab] = useState<'general' | 'language' | 'history'>('general');
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [tempCustomLang, setTempCustomLang] = useState('');

  const isStandardLanguage = (lang: string) => 
    LANGUAGE_OPTIONS.some(opt => opt.value !== 'other' && opt.value.toLowerCase() === lang.toLowerCase());

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(tempKey);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 space-y-8">
      <header className="space-y-2">
        <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight">Ustawienia Systemu</h1>
        <p className="text-on-surface-variant font-body text-sm md:text-base">Spersonalizuj swoją naukę i zarządzaj kluczem AI.</p>
      </header>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex bg-surface-container-low p-1 rounded-2xl border border-white/5 w-full md:w-fit overflow-x-auto custom-scrollbar no-scrollbar whitespace-nowrap">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'general' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Klucz API
        </button>
        <button 
          onClick={() => setActiveTab('language')}
          className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'language' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Język Nauki
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Historia Słów
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'general' && (
          <section className="space-y-6">
             <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                <form onSubmit={handleSaveConfig} className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider ml-1">Klucz OpenAI API</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary rounded-2xl py-4 pl-4 pr-12 text-on-surface transition-all font-body text-sm"
                        type={showKey ? "text" : "password"}
                        placeholder="sk-..."
                        value={tempKey}
                        onChange={(e) => setTempKey(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {showKey ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    <p className="text-[11px] text-outline px-1 leading-relaxed">Klucz jest zapisywany tylko w Twojej przeglądarce. Pozwala on na generowanie historii przez model GPT-4o-mini.</p>
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    {apiKey && (
                      <button 
                        type="button"
                        onClick={onClearKey}
                        className="px-6 py-3 rounded-full bg-error/10 text-error font-bold text-sm hover:bg-error/20 transition-all"
                      >
                        Wyczyść Klucz
                      </button>
                    )}
                    <button 
                      type="submit"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm"
                    >
                      Zapisz Klucz
                    </button>
                  </div>
                </form>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
             </div>

             <div className="bg-surface-container-high p-6 rounded-3xl border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface mb-1">Bezpieczeństwo Połączenia</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Twoje dane są przesyłane bezpośrednio do serwerów OpenAI za pomocą bezpiecznego protokołu HTTPS.</p>
                </div>
             </div>
          </section>
        )}

        {activeTab === 'language' && (
          <section className="space-y-6">
             <div className="glass-panel p-5 md:p-8 rounded-3xl border border-white/5">
                <h3 className="font-headline font-bold text-lg md:text-xl mb-6">Wybierz Język Nauki</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {LANGUAGE_OPTIONS.map((lang) => {
                    const isSelected = lang.value === 'other' 
                      ? !isStandardLanguage(targetLanguage)
                      : targetLanguage.toLowerCase() === lang.value.toLowerCase();

                    return (
                      <button
                        key={lang.value}
                        onClick={() => {
                          if (lang.value === 'other') {
                            setTempCustomLang('');
                            onSetLanguage('...'); // Placeholder to trigger 'other' state
                          } else {
                            onSetLanguage(lang.value);
                          }
                        }}
                        className={`p-4 md:p-6 rounded-2xl border transition-all flex flex-col items-center gap-2 md:gap-3 group relative overflow-hidden ${isSelected ? 'bg-primary/20 border-primary shadow-lg' : 'bg-surface-container-high border-white/5 hover:bg-surface-bright'}`}
                      >
                        <span className="text-3xl md:text-4xl">{lang.flag}</span>
                        <span className={`font-bold text-xs md:text-sm ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>{lang.label}</span>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <span className="material-symbols-outlined text-primary text-xs md:text-sm">check_circle</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {!isStandardLanguage(targetLanguage) && (
                  <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider ml-1 mb-3">Wpisz Język</label>
                    <div className="flex gap-3">
                      <input 
                        className="flex-1 bg-surface-container-lowest border border-outline-variant/20 focus:border-primary rounded-2xl py-4 px-4 text-on-surface transition-all font-body text-sm"
                        placeholder="np. Niderlandzki, Japoński..."
                        value={targetLanguage === '...' ? tempCustomLang : targetLanguage}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTempCustomLang(val);
                          onSetLanguage(val);
                        }}
                      />
                    </div>
                  </div>
                )}
             </div>

             <div className="bg-surface-container-high p-6 rounded-3xl border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary-dim flex-shrink-0">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface mb-1">Dostosowanie AI</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Model AI wygeneruje historię w wybranym języku, dopasowując słownictwo do Twojego poziomu trudności.</p>
                </div>
             </div>
          </section>
        )}

        {activeTab === 'history' && (
          <section className="space-y-6">
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 min-h-[300px]">
              <div className="flex justify-between items-center mb-6 px-1">
                <h3 className="font-headline font-bold text-xl">Historia Poznanych Słów</h3>
                <span className="text-xs text-outline-variant font-bold uppercase tracking-wider">{history.length} Słów</span>
              </div>

              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-50">
                  <span className="material-symbols-outlined text-6xl">list_alt</span>
                  <p className="text-sm italic">Nie masz jeszcze żadnych słów w historii.<br/>Zacznij generować historie, aby je tutaj zobaczyć.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {history.map((word) => (
                    <div key={word.id} className="bg-surface-container-high p-4 rounded-xl border border-white/5 flex flex-col gap-1 transition-all hover:border-primary/30">
                      <div className="flex justify-between items-start">
                        <span className="font-headline font-bold text-primary">{word.word}</span>
                        <span className="bg-surface-container-low px-2 py-0.5 rounded text-[8px] font-black uppercase text-outline-variant">{word.difficulty}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant italic">{word.translation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <div className="pt-8">
        <button
          onClick={() => onNavigate(APP_STEP.INPUT)}
          className="w-full p-4 rounded-2xl bg-surface-container-highest border border-white/5 text-on-surface font-bold text-sm hover:bg-surface-bright transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">home</span>
          Wróć do Panelu Głównego
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
