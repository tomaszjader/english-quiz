import React, { useState } from 'react';
import { Key, ShieldCheck, ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ApiKeySetup = ({ onSave }) => {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!key.startsWith('sk-')) {
            setError('Nieprawidłowy format klucza API. Powinien zaczynać się od "sk-".');
            return;
        }
        onSave(key);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 max-w-3xl mx-auto overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[80px] rounded-full" />
            
            <div className="relative z-10">
                <div className="bg-gradient-to-br from-cyan-400 to-magenta-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-glow rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Key className="text-slate-900" size={48} strokeWidth={2.5} />
                </div>
                
                <h2 className="text-5xl font-black mb-4 outfit tracking-tighter">Włącz Potęgę AI</h2>
                <p className="text-slate-400 mb-12 text-xl max-w-lg mx-auto leading-relaxed">
                    Aby generować spersonalizowane historie i quizy, wprowadź swój klucz <span className="text-cyan-400 font-bold">OpenAI API Key</span>.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
                    <div className="space-y-2 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-black ml-4 block mb-2">Twój Tajny Klucz OpenAI</label>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full z-[-1]" />
                            <input 
                                type="password"
                                placeholder="sk-..."
                                value={key}
                                onChange={(e) => {
                                    setKey(e.target.value);
                                    setError('');
                                }}
                                className="modern-input w-full py-5 px-8 text-xl text-center tracking-widest font-mono group-focus:placeholder:opacity-0 transition-all"
                                required
                            />
                        </div>
                        {error && (
                            <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-3 ml-4 flex items-center gap-2 font-medium"
                            >
                                <Zap size={14} className="fill-current" />
                                {error}
                            </motion.p>
                        )}
                    </div>

                    <button 
                        type="submit"
                        className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-4 group"
                    >
                        <span>Zapisz i Rozpocznij Przygodę</span>
                        <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4 text-cyan-400">
                            <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-black text-xs uppercase tracking-widest">Bezpieczeństwo</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Twój klucz jest przechowywany <span className="text-slate-200 font-bold underline decoration-cyan-400/50">wyłącznie lokalnie</span> w Twojej przeglądarce (localStorage). Nigdy nie opuszcza Twojego urządzenia.
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4 text-magenta-400">
                            <Key size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="font-black text-xs uppercase tracking-widest">Gdzie go znajdę?</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Pobierz swój klucz bezpośrednio z panelu OpenAI:</p>
                        <a 
                            href="https://platform.openai.com/api-keys" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-magenta-400 hover:text-magenta-300 text-sm font-bold transition-colors group-hover:underline"
                        >
                            OpenAI Dashboard <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ApiKeySetup;
