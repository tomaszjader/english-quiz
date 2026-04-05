import React, { useState } from 'react';
import { BookMarked, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StoryViewer = ({ story, onStartQuiz }) => {
  const { title, content, targetWords, wordTranslations } = story;
  const [activeTooltip, setActiveTooltip] = useState(null); // { word: string, position: { x, y } }

  const handleWordClick = (e, word) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      word,
      translation: wordTranslations[word.toLowerCase()] || wordTranslations[word] || 'Tłumaczenie niedostępne',
      position: { x: rect.left + rect.width / 2, y: rect.top - 10 }
    });
  };

  // Function to highlight target words in the content
  const renderContent = () => {
    let parts = [content];
    
    // Sort targetWords by length descending to help avoid partial matches
    const sortedWords = [...targetWords].sort((a, b) => b.length - a.length);

    sortedWords.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi'); // Use \b for whole word matching
      let newParts = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const split = part.split(regex);
          newParts.push(...split);
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) => {
      const isTarget = targetWords.some(tw => tw.toLowerCase() === part.toLowerCase());
      if (isTarget) {
        return (
          <motion.span 
            key={index}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => handleWordClick(e, part)}
            className="inline-block px-1 font-bold text-cyan-400 cursor-pointer underline decoration-cyan-500/30 hover:decoration-cyan-400 hover:bg-cyan-400/10 rounded transition-all"
          >
            {part}
          </motion.span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-10 max-w-4xl mx-auto relative"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-cyan-500/20 p-3 rounded-2xl text-cyan-400">
          <BookMarked size={32} />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight outfit">{title}</h2>
      </div>

      <div className="prose prose-invert prose-lg max-w-none mb-12 leading-relaxed text-slate-200">
        <div className="text-xl first-letter:text-5xl first-letter:font-bold first-letter:text-cyan-400 first-letter:mr-3 first-letter:float-left">
          {renderContent()}
        </div>
      </div>

      {/* Tooltip Translation */}
      <AnimatePresence>
        {activeTooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            style={{ 
              position: 'fixed', 
              left: activeTooltip.position.x, 
              top: activeTooltip.position.y,
              transform: 'translateX(-50%)',
              zIndex: 100
            }}
            className="bg-cyan-500 text-black px-4 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3 whitespace-nowrap border-2 border-white/20"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase opacity-60 tracking-widest leading-none mb-1">Tłumaczenie</span>
              <span>{activeTooltip.translation}</span>
            </div>
            <button 
                onClick={() => setActiveTooltip(null)}
                className="hover:bg-black/10 p-1 rounded-full text-black/60"
            >
                <X size={14} />
            </button>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rotate-45 border-r border-b border-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 mt-8">
        <div className="flex flex-wrap gap-2">
          {targetWords.map((word, i) => (
            <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-slate-400 uppercase tracking-widest">
              {word}
            </span>
          ))}
        </div>
        <button 
          onClick={onStartQuiz}
          className="btn-primary flex items-center gap-2 group whitespace-nowrap"
        >
          Sprawdź rozumienie
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default StoryViewer;
