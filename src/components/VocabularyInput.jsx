import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Send, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VocabularyInput = ({ onGenerate, initialWords = [] }) => {
    const [words, setWords] = useState(
        initialWords.length > 0 
        ? initialWords 
        : [{ id: Date.now(), word: '', translation: '', difficulty: 'Medium' }]
    );
    const [category, setCategory] = useState('general');

    const addWord = () => {
        if (words.length >= 20) return;
        setWords([...words, { id: Date.now(), word: '', translation: '', difficulty: 'Medium' }]);
    };

    const removeWord = (id) => {
        if (words.length <= 1) return;
        setWords(words.filter(w => w.id !== id));
    };

    const updateWord = (id, field, value) => {
        setWords(words.map(w => w.id === id ? { ...w, [field]: value } : w));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validWords = words.filter(w => w.word.trim() !== '');
        if (validWords.length < 3) {
            alert('Dodaj przynajmniej 3 słówka, aby wygenerować historię.');
            return;
        }
        onGenerate(validWords, category);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-black outfit mb-3 flex items-center gap-3">
                        <span className="p-3 bg-cyan-400/10 rounded-2xl text-cyan-400 shadow-glow">
                            <BookOpen size={28} />
                        </span>
                        Dodaj Słówka
                    </h2>
                    <p className="text-slate-400 text-lg">Wpisz wyrażenia, które chcesz utrwalić.</p>
                </div>
                
                <div className="w-full md:w-auto">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 block ml-1">Kategoria</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="modern-input w-full md:w-48 cursor-pointer font-semibold"
                    >
                        <option value="general">🌍 Ogólne</option>
                        <option value="travel">✈️ Podróże</option>
                        <option value="business">💼 Biznes</option>
                        <option value="tech">💻 Technologia</option>
                        <option value="daily">🏠 Codzienność</option>
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {words.map((w, index) => (
                            <motion.div 
                                key={w.id}
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_48px] gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group"
                            >
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 md:hidden">Słowo</label>
                                    <input 
                                        placeholder="Słowo (np. Ethereal)"
                                        value={w.word}
                                        onChange={(e) => updateWord(w.id, 'word', e.target.value)}
                                        className="bg-transparent border-b border-white/10 w-full px-2 py-2 focus:border-cyan-400 outline-none transition-colors font-medium text-lg"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 md:hidden">Tłumaczenie</label>
                                    <input 
                                        placeholder="Tłumaczenie..."
                                        value={w.translation}
                                        onChange={(e) => updateWord(w.id, 'translation', e.target.value)}
                                        className="bg-transparent border-b border-white/10 w-full px-2 py-2 focus:border-magenta-400 outline-none transition-colors italic text-slate-300"
                                    />
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                    <select 
                                        value={w.difficulty}
                                        onChange={(e) => updateWord(w.id, 'difficulty', e.target.value)}
                                        className="bg-zinc-900 border border-white/10 rounded-xl px-2 py-2 text-xs font-bold text-slate-400 focus:border-cyan-400 outline-none"
                                    >
                                        <option value="Easy">Łatwe</option>
                                        <option value="Medium">Średnie</option>
                                        <option value="Hard">Trudne</option>
                                    </select>
                                </div>
                                <div className="flex justify-center pt-4 md:pt-0">
                                    <button 
                                        type="button" 
                                        onClick={() => removeWord(w.id)}
                                        className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Usuń słowo"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-8 border-t border-white/5">
                    <button 
                        type="button" 
                        onClick={addWord}
                        className="btn-secondary flex-1 flex items-center justify-center gap-3 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
                        <span>Dodaj Słowo</span>
                    </button>
                    <button 
                        type="submit"
                        className="btn-primary flex-[2] flex items-center justify-center gap-3 group overflow-hidden relative"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        <Sparkles size={20} className="animate-pulse" /> 
                        <span className="text-lg">Generuj Magiczną Historię</span>
                        <Send size={18} className="translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default VocabularyInput;
