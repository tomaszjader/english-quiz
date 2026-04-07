import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LogOut, RefreshCw, GraduationCap } from 'lucide-react';
import Logo from './Logo';

const Header = ({ apiKey, onClearKey, onRestart }) => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <header className="max-w-7xl mx-auto mb-16 text-center relative">
            {apiKey && (
                <div className="absolute top-0 right-0 z-50">
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-slate-400 hover:text-cyan-400"
                        aria-label="Settings"
                    >
                        <Settings size={24} />
                    </button>
                    <AnimatePresence>
                        {showSettings && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute top-14 right-0 w-56 glass-card border border-white/10 p-2 overflow-hidden"
                            >
                                <div className="px-3 py-2 border-b border-white/5 mb-2">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Ustawienia</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        onRestart();
                                        setShowSettings(false);
                                    }}
                                    className="w-full flex items-center gap-3 p-3 text-sm text-slate-300 hover:bg-white/10 rounded-xl transition-all"
                                >
                                    <RefreshCw size={16} /> Zacznij Od Nowa
                                </button>
                                <button 
                                    onClick={() => {
                                        if (window.confirm('Czy na pewno chcesz usunąć klucz API?')) {
                                            onClearKey();
                                            setShowSettings(false);
                                        }
                                    }}
                                    className="w-full flex items-center gap-3 p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                                >
                                    <LogOut size={16} /> Usuń Klucz API
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex flex-col items-center gap-4 mb-10"
            >
                <div className="p-4 bg-white/5 border border-white/10 rounded-3xl shadow-glow relative group overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors" />
                    <Logo className="w-12 h-12 relative z-10" />
                </div>
                <span className="text-xs font-black tracking-widest outfit text-cyan-200 uppercase px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    AI-Powered English Learning
                </span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl md:text-7xl font-black mb-6 outfit tracking-tighter leading-tight"
            >
                Elevate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 animate-gradient">Vocabulary</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
                Opanuj nowe słownictwo dzięki spersonalizowanym historiom <br className="hidden md:block" /> i inteligentnym quizom napędzanym przez AI.
            </motion.p>
        </header>
    );
};

export default Header;
