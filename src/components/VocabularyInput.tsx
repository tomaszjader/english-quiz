import React, { useMemo, useState } from 'react';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS, QUIZ_LIMITS } from '../constants/app';
import type { WordEntry } from '../types';
import { createWordEntry, sanitizeWords } from '../utils/quiz';

interface VocabularyInputProps {
  initialWords?: WordEntry[];
  onGenerate: (words: WordEntry[], category: string) => void;
  onSave?: (words: WordEntry[]) => void;
}

const VocabularyInput = ({ initialWords = [], onGenerate, onSave }: VocabularyInputProps) => {
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [words, setWords] = useState<WordEntry[]>(() =>
    initialWords.length ? sanitizeWords(initialWords) : [createWordEntry()],
  );

  const activeCategory = useMemo(
    () => CATEGORY_OPTIONS.find((option) => option.value === category),
    [category],
  );

  const updateWord = (id: string, field: keyof WordEntry, value: string) => {
    setWords((currentWords) =>
      currentWords.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    );
  };

  const addWord = () => {
    setWords((currentWords) =>
      currentWords.length >= QUIZ_LIMITS.MAX_WORDS ? currentWords : [...currentWords, createWordEntry()],
    );
  };

  const removeWord = (id: string) => {
    setWords((currentWords) =>
      currentWords.length === 1 ? currentWords : currentWords.filter((entry) => entry.id !== id),
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(words);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validWords = sanitizeWords(words);
    if (validWords.length < QUIZ_LIMITS.MIN_WORDS) {
      setError(`Dodaj co najmniej ${QUIZ_LIMITS.MIN_WORDS} słowa, aby wygenerować historię.`);
      return;
    }
    setError('');
    onGenerate(validWords, category);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4 px-2 md:px-0">
        <h2 className="font-headline font-extrabold text-3xl md:text-6xl tracking-tighter text-glow drop-shadow-[0_0_15px_rgba(182,160,255,0.4)] px-4 md:px-0">
          Twórz Nowe <span className="text-primary italic">Opowieści.</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl text-base md:text-lg leading-relaxed font-body px-4 md:px-0">
          Przekształć swoją listę słówek w immersyjne historie. Nasza AI splecie Twoje słownictwo w kontekst, który zapada w pamięć.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Word List Card */}
        <div className="md:col-span-8 glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
          <div className="flex items-center justify-between px-1">
            <label className="font-headline font-bold text-lg md:text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              Lista Słów
            </label>
            <span className="text-[9px] md:text-[10px] font-label text-on-surface-variant uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full">
              Min. {QUIZ_LIMITS.MIN_WORDS} Słowa
            </span>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
            {words.map((entry, index) => (
              <div key={entry.id} className="bg-surface-container-low rounded-2xl p-4 flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-end group transition-all hover:bg-surface-container-high border border-white/5">
                <div className="w-full sm:flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">Słowo {index + 1}</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface transition-all"
                    placeholder="np. Ephemeral"
                    value={entry.word}
                    onChange={(e) => updateWord(entry.id, 'word', e.target.value)}
                  />
                </div>
                <div className="w-full sm:flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">Tłumaczenie</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface transition-all"
                    placeholder="opcjonalnie"
                    value={entry.translation}
                    onChange={(e) => updateWord(entry.id, 'translation', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeWord(entry.id)}
                  className="self-end sm:self-auto p-3 text-outline-variant hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
            <button 
              onClick={addWord}
              className="w-full sm:w-auto px-6 py-3 bg-surface-container-high border border-outline-variant/10 rounded-full text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Dodaj Kolejne
            </button>
            <button 
              onClick={handleSave}
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all ${saveSuccess ? 'bg-tertiary/20 text-tertiary-dim' : 'bg-surface-container-high border border-outline-variant/10 hover:bg-surface-bright'}`}
            >
              <span className="material-symbols-outlined text-sm">{saveSuccess ? 'check_circle' : 'save'}</span>
              {saveSuccess ? 'Zapisano' : 'Zapisz Listę'}
            </button>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Category/Style selection */}
          <div className="bg-surface-container-low rounded-3xl p-6 space-y-4 border border-white/5">
            <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant">Ton Opowieści</h4>
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              {CATEGORY_OPTIONS.map((opt) => (
                <div 
                  key={opt.value}
                  onClick={() => setCategory(opt.value)}
                  className={`min-h-[92px] rounded-xl border cursor-pointer transition-all group flex flex-col items-start justify-center gap-2 p-4 ${category === opt.value ? 'bg-surface-bright border-primary/60 text-primary shadow-lg shadow-primary/10' : 'bg-surface-container-high border-outline-variant/10 hover:bg-surface-bright'}`}
                >
                  <span className={`material-symbols-outlined shrink-0 ${category === opt.value ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                    {opt.value === 'general' ? 'public' : 
                     opt.value === 'daily' ? 'sunny' : 
                     opt.value === 'travel' ? 'explore' : 
                     opt.value === 'business' ? 'work' : 
                     'memory'}
                  </span>
                  <span className="w-full pr-2 text-[13px] font-bold leading-5 whitespace-normal break-normal normal-case tracking-normal">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-on-surface-variant italic px-1 mt-2">
              {activeCategory?.description}
            </p>
          </div>

          <div className="bg-surface-container-low rounded-3xl p-6 border border-white/5 relative overflow-hidden flex flex-col justify-end min-h-[160px]">
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCJn7oXSE0d4tOCcEyhgWzaJmRm_p0UT9EboqkN3GU6HJ47aktYx0xcfhea7tNuHghGICCGrSnR08gHjdPSUcg-v_6moQP_00g4dIhLnGDpAJWoP7_gfl7CP5-MGM8XYejEDJIlil7zdARuY3xt-qEnmjJEO388v9nu3_3e8QXg1t9W4fLTaLpcMF1YzyibNZnzmCYcgzWnZ0uP78DWmleOVC80mQ8nTppxfdmJynB4ozrzZRbz2slmf5UWoE8SmIMcPbRZbxgJuE" alt="Decorative"/>
             </div>
             <div className="relative z-10 space-y-2">
                <span className="bg-primary/20 text-primary text-[8px] font-bold px-2 py-0.5 rounded-full uppercase border border-primary/30">AI Insight</span>
                <h4 className="font-headline font-bold text-white text-lg leading-tight">Kontekstualna Nauka</h4>
                <p className="text-on-surface-variant text-[10px]">AI splata Twoje słowa w historię, ułatwiając zapamiętywanie.</p>
             </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="md:col-span-12">
          {error && <p className="text-error text-sm font-medium mb-4 ml-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">warning</span>
            {error}
          </p>}
          <button 
            onClick={handleSubmit}
            className="group relative w-full p-6 md:p-8 bg-gradient-to-br from-[#b6a0ff] to-[#7e51ff] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 active:scale-[0.98]"
          >
            <div className="relative z-10 flex items-center justify-center gap-4 text-white">
              <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:rotate-12 transition-transform">auto_awesome</span>
              <div className="text-left">
                <p className="font-headline font-extrabold text-xl md:text-2xl tracking-tight leading-none">Generuj Historię AI</p>
                <p className="font-label text-xs md:text-sm opacity-80 mt-1">Stwórz unikalną opowieść opartą na Twoim słownictwie</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default VocabularyInput;
