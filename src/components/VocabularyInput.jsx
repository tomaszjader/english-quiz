import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VocabularyInput = ({ onGenerate, initialWords = [] }) => {
  const [words, setWords] = useState(initialWords.length > 0 ? initialWords : [{ id: 1, word: '', translation: '', category: 'General', difficulty: 'Medium' }]);
  const [category, setCategory] = useState('general');

  const addWord = () => {
    if (words.length >= 20) return;
    setWords([...words, { id: Date.now(), word: '', translation: '', category: 'General', difficulty: 'Medium' }]);
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
      alert('Please add at least 3 words to generate a story.');
      return;
    }
    onGenerate(validWords, category);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold neon-text mb-2 flex items-center gap-3">
            <BookOpen className="text-cyan-400" /> Dodaj Słówka
          </h2>
          <p className="text-slate-400">Wprowadź słowa, których chcesz się nauczyć dzisiaj.</p>
        </div>
        <div className="flex gap-4">
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
                <option value="general">Ogólne</option>
                <option value="travel">Podróże</option>
                <option value="food">Jedzenie</option>
            </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence>
          {words.map((w, index) => (
            <motion.div 
              key={w.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_48px] gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              <input 
                placeholder="Słowo (np. Apple)"
                value={w.word}
                onChange={(e) => updateWord(w.id, 'word', e.target.value)}
                className="bg-transparent border-b border-slate-600 px-2 py-1 focus:border-cyan-400 outline-none transition-colors"
                required
              />
              <input 
                placeholder="Tłumaczenie (np. Jabłko)"
                value={w.translation}
                onChange={(e) => updateWord(w.id, 'translation', e.target.value)}
                className="bg-transparent border-b border-slate-600 px-2 py-1 focus:border-magenta-400 outline-none transition-colors"
              />
              <select 
                value={w.difficulty}
                onChange={(e) => updateWord(w.id, 'difficulty', e.target.value)}
                className="bg-transparent text-xs border border-slate-700 rounded px-2 py-1"
              >
                <option value="Easy">Łatwe</option>
                <option value="Medium">Średnie</option>
                <option value="Hard">Trudne</option>
              </select>
              <button 
                type="button" 
                onClick={() => removeWord(w.id)}
                className="text-slate-500 hover:text-red-400 transition-colors flex justify-center"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <button 
            type="button" 
            onClick={addWord}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Dodaj Słowo
          </button>
          <button 
            type="submit"
            className="btn-primary flex-[2] flex items-center justify-center gap-2 group"
          >
            <Send size={20} className="group-hover:translate-x-1 transition-transform" /> 
            Generuj Historię
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default VocabularyInput;
