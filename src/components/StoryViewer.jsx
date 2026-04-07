import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, HelpCircle, ArrowRight, Volume2, Languages } from 'lucide-react';

const StoryViewer = ({ story, onStartQuiz, loading }) => {
    const [selectedWord, setSelectedWord] = useState(null);
    const [showTranslations, setShowTranslations] = useState(false);

    // Split content into words to allow highlighting target words
    const renderContent = () => {
        if (!story?.content) return null;
        
        const words = story.content.split(' ');
        return words.map((word, i) => {
            const cleanWord = word.replace(/[.,!?;:()]/g, "").toLowerCase();
            const isTarget = story.targetWords?.some(tw => tw.toLowerCase() === cleanWord);
            
            if (isTarget) {
                return (
                    <span key={i} className="relative inline-block group">
                        <motion.span 
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setSelectedWord(cleanWord)}
                            className="inline-block px-1 mx-0.5 rounded-md cursor-help border-b-2 border-cyan-400/50 text-cyan-400 font-bold bg-cyan-400/5 hover:bg-cyan-400/10 transition-colors"
                        >
                            {word}
                        </motion.span>
                        {i < words.length - 1 && " "}
                    </span>
                );
            }
            return word + (i < words.length - 1 ? " " : "");
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card overflow-hidden"
        >
            {/* Story Header */}
            <div className="p-8 md:p-12 border-b border-white/5 bg-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                        <BookOpen size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Twoja Historia</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black outfit leading-tight">{story.title}</h2>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowTranslations(!showTranslations)}
                        className={`p-4 rounded-2xl transition-all border ${showTranslations ? 'bg-magenta-500/20 border-magenta-500/50 text-magenta-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                        title="Pokaż tłumaczenia"
                    >
                        <Languages size={24} />
                    </button>
                    <button 
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:bg-white/10 transition-all"
                        title="Czytaj na głos"
                        disabled
                    >
                        <Volume2 size={24} />
                    </button>
                </div>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-12">
                {/* Main Content */}
                <article className="prose prose-invert max-w-none">
                    <div className="text-xl md:text-2xl leading-relaxed font-medium text-slate-200 first-letter:text-7xl first-letter:font-black first-letter:text-cyan-400 first-letter:float-left first-letter:mr-4 first-letter:mt-2">
                        {renderContent()}
                    </div>
                </article>

                {/* Sidebar - Target Words */}
                <aside className="space-y-6">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                            <Sparkles size={14} className="text-cyan-400" />
                            Kluczowe słownictwo
                        </h3>
                        <div className="flex flex-wrap lg:flex-col gap-3">
                            {story.targetWords.map((word, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    className={`flex flex-col p-3 rounded-xl border transition-all ${selectedWord === word.toLowerCase() ? 'bg-cyan-400/10 border-cyan-400/50' : 'bg-white/5 border-transparent'}`}
                                >
                                    <span className="font-bold text-cyan-400 capitalize">{word}</span>
                                    {(showTranslations || selectedWord === word.toLowerCase()) && (
                                        <motion.span 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-sm text-slate-400 italic mt-1 border-t border-white/5 pt-1"
                                        >
                                            {story.wordTranslations?.[word] || "..."}
                                        </motion.span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-400/10 to-magenta-400/10 border border-white/5 rounded-2xl p-6 text-center">
                        <HelpCircle size={32} className="mx-auto text-magenta-400 mb-4 animate-pulse" />
                        <h4 className="font-bold mb-2">Gotowy na quiz?</h4>
                        <p className="text-sm text-slate-400 mb-6">Sprawdź czy zapamiętałeś nowe słówka!</p>
                        <button 
                            onClick={onStartQuiz}
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Rozpocznij Quiz</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </aside>
            </div>
            
            <AnimatePresence>
                {selectedWord && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedWord(null)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-10 max-w-sm w-full text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-magenta-400" />
                            <h3 className="text-4xl font-black outfit text-cyan-400 mb-2 capitalize">{selectedWord}</h3>
                            <p className="text-xl italic text-slate-400 mb-8 border-b border-white/10 pb-4">
                                {story.wordTranslations?.[story.targetWords.find(tw => tw.toLowerCase() === selectedWord)] || "Ładowanie..."}
                            </p>
                            <button 
                                onClick={() => setSelectedWord(null)}
                                className="btn-secondary w-full"
                            >
                                Zamknij
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default StoryViewer;
