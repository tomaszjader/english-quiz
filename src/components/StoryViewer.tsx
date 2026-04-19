import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { Story } from '../types';
import { normalizeLookup, tokenizeStory } from '../utils/quiz';

interface StoryViewerProps {
  loading: boolean;
  onStartQuiz: () => void;
  story: Story;
}

const StoryViewer = ({ loading, onStartQuiz, story }: StoryViewerProps) => {
  const [selectedWord, setSelectedWord] = useState('');
  
  const highlightedWords = useMemo(
    () => new Set(story.targetWords.map((word) => normalizeLookup(word))),
    [story.targetWords],
  );

  const tokens = useMemo(() => tokenizeStory(story.content), [story.content]);

  const selectedTranslation = useMemo(() => {
    const originalWord = story.targetWords.find((word) => normalizeLookup(word) === selectedWord);
    return originalWord ? story.wordTranslations?.[originalWord] : '';
  }, [selectedWord, story.targetWords, story.wordTranslations]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      {/* Story Reader Column */}
      <div className="xl:col-span-8 flex flex-col space-y-12">
        {/* Story Header */}
        <div className="space-y-4 px-2 md:px-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-secondary-container/30 text-secondary-fixed text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-secondary-dim/20">
              Atmosphere: {story.title.split(' ').slice(0, 2).join(' ')}
            </span>
            <span className="text-on-surface-variant text-[10px] md:text-xs flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-sm">schedule</span> ~3 min czytania
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-on-surface tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(182,160,255,0.2)]">
            {story.title}
          </h2>
          <p className="font-body text-on-surface-variant text-sm md:text-base max-w-xl italic">
            Zidentyfikuj wyróżnione słowa, aby zobaczyć ich znaczenie.
          </p>
        </div>

        {/* Interactive Reader Card */}
        <article className="glass-panel rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-16 shadow-2xl relative border border-white/5">
          <div className="serif-reading text-lg md:text-2xl text-on-surface/90 leading-relaxed space-y-8 px-2 md:px-0">
            <p>
              {tokens.map((token, index) => {
                const normalized = normalizeLookup(token);
                const isTarget = normalized && highlightedWords.has(normalized);

                if (!isTarget) {
                  return <span key={`${token}-${index}`}>{token}</span>;
                }

                const isActive = selectedWord === normalized;

                return (
                  <span 
                    key={`${token}-${index}`}
                    className="relative inline-block group"
                  >
                    <button
                      type="button"
                      className={`px-1 rounded transition-colors font-bold ${isActive ? 'text-primary bg-primary/10 border-b-2 border-primary' : 'text-primary border-b-2 border-primary/40 hover:border-primary'}`}
                      onClick={() => setSelectedWord(isActive ? '' : normalized)}
                    >
                      {token}
                    </button>
                    
                    {/* Translation Bubble */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="word-bubble absolute -top-16 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-sm font-bold py-2 px-4 rounded-xl shadow-2xl whitespace-nowrap z-50 flex flex-col items-center min-w-[120px]"
                        >
                          <span className="truncate max-w-[200px]">{selectedTranslation || '...'}</span>
                          <span className="text-[10px] font-medium opacity-80 italic">(tłumaczenie)</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                );
              })}
            </p>
          </div>
          
          {/* Ambient Decoration */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[100px] -z-10" />
        </article>

        {/* Action Bar --> Adjusted for mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 md:px-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button className="p-3 md:p-4 rounded-full bg-surface-container-highest hover:bg-surface-bright transition-colors flex-1 sm:flex-none flex justify-center">
              <span className="material-symbols-outlined text-xl md:text-2xl">format_size</span>
            </button>
            <button className="p-3 md:p-4 rounded-full bg-surface-container-highest hover:bg-surface-bright transition-colors flex-1 sm:flex-none flex justify-center">
              <span className="material-symbols-outlined text-xl md:text-2xl">auto_read_play</span>
            </button>
          </div>
          <div className="w-full sm:w-auto">
             <button 
              onClick={onStartQuiz}
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              {loading ? 'Przygotowuję Quiz...' : 'Rozpocznij Quiz'}
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Progress Column */}
      <div className="xl:col-span-4 space-y-8">
        <div className="bg-surface-container-low rounded-3xl p-8 space-y-6 border border-white/5">
          <div className="flex justify-between items-center">
            <h3 className="font-headline font-bold text-lg">Postęp Sesji</h3>
            <span className="text-tertiary font-black text-xl">100%</span>
          </div>
          <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-tertiary to-tertiary-dim w-[100%] rounded-full shadow-[0_0_15px_rgba(187,255,227,0.3)]" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5">
              <span className="block text-[10px] uppercase tracking-wider text-on-surface-variant mb-1 font-bold">Słowa</span>
              <span className="text-2xl font-black text-on-surface">{story.targetWords.length}</span>
            </div>
            <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5">
              <span className="block text-[10px] uppercase tracking-wider text-on-surface-variant mb-1 font-bold">Poziom</span>
              <span className="text-lg font-black text-on-surface truncate">Advanced</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-headline font-bold text-lg text-on-surface px-2">Leksykon Sesji</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {story.targetWords.map((word) => {
              const isActive = selectedWord === normalizeLookup(word);
              return (
                <div 
                  key={word}
                  onClick={() => setSelectedWord(normalizeLookup(word))}
                  className={`p-5 rounded-2xl transition-all cursor-pointer border border-white/5 ${isActive ? 'bg-surface-container-highest border-l-4 border-l-primary scale-[1.02]' : 'bg-surface-container-highest/50 hover:bg-surface-container-highest'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-headline font-bold text-primary">{word}</span>
                    {isActive && <span className="material-symbols-outlined text-primary text-sm">visibility</span>}
                  </div>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    {story.wordTranslations?.[word] || 'Dotknij, aby zobaczyć tłumaczenie w kontekście.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-dim/20 to-secondary-dim/20 p-8 rounded-3xl group border border-white/5">
          <div className="relative z-10 space-y-4">
            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
            <h4 className="font-headline font-bold text-xl leading-tight text-white">Podsumowanie AI</h4>
            <p className="text-sm text-on-surface-variant text-white/70">Wszystkie kluczowe słowa zostały pomyślnie zintegrowane z opowieścią.</p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
