import React, { useState } from 'react';
import { Key, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ApiKeySetup = ({ onSave }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!key.startsWith('sk-')) {
      setError('Invalid API key format. It should start with "sk-".');
      return;
    }
    onSave(key);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-12 max-w-2xl mx-auto text-center"
    >
      <div className="bg-cyan-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
        <Key className="text-cyan-400" size={40} />
      </div>
      
      <h2 className="text-4xl font-bold mb-4 outfit">Konfiguracja AI</h2>
      <p className="text-slate-400 mb-8 text-lg">
        Aby korzystać z pełnej mocy AI, wprowadź swój klucz **OpenAI API Key**. 
        Klucz zostanie zapisany tylko lokalnie w Twojej przeglądarce.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input 
            type="password"
            placeholder="sk-..."
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError('');
            }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono"
            required
          />
          {error && <p className="text-red-400 text-sm mt-2 text-left">{error}</p>}
        </div>

        <button 
          type="submit"
          className="btn-primary w-full py-4 text-xl flex items-center justify-center gap-3 group"
        >
          Zapisz i Rozpocznij
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 text-left">
        <div className="flex items-center gap-3 mb-3 text-cyan-400">
          <ShieldCheck size={20} />
          <span className="font-bold text-sm uppercase tracking-wider">Bezpieczeństwo</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Twój klucz jest przechowywany bezpiecznie w <code>localStorage</code>. 
          Nigdy nie jest wysyłany na nasze serwery (aplikacja działa w 100% po stronie klienta).
        </p>
        <a 
          href="https://platform.openai.com/api-keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mt-4 transition-colors"
        >
          Pobierz swój klucz z OpenAI <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default ApiKeySetup;
