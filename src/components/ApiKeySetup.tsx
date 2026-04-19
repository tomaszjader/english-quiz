import React, { useState } from 'react';

interface ApiKeySetupProps {
  onSave: (key: string) => void;
}

const ApiKeySetup = ({ onSave }: ApiKeySetupProps) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!key.trim().startsWith('sk-')) {
      setError('Klucz API powinien zaczynać się od "sk-".');
      return;
    }

    onSave(key.trim());
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">Konfiguracja Systemu</h1>
        <p className="text-on-surface-variant font-body">Zarządzaj swoim kluczem AI, aby uruchomić generator historii.</p>
      </header>

      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">hub</span>
            <h2 className="font-headline font-bold text-xl text-on-surface">Konfiguracja OpenAI</h2>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-on-surface-variant ml-1">Klucz OpenAI API</label>
                  <div className="relative">
                    <input 
                      className={`w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl py-4 pl-4 pr-12 text-on-surface transition-all font-body ${error ? 'border-error/50' : ''}`}
                      type={showKey ? "text" : "password"}
                      placeholder="sk-..."
                      value={key}
                      onChange={(e) => {
                        setKey(e.target.value);
                        setError('');
                      }}
                      autoComplete="off"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        {showKey ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {error && <p className="text-error text-xs px-1 font-medium">{error}</p>}
                  <p className="text-[11px] text-outline px-1">Twój klucz jest szyfrowany i zapisywany lokalnie. Nigdy nie przesyłamy go na nasze serwery.</p>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-on-surface-variant ml-1">Wybrany Model AI</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl py-4 px-4 text-on-surface appearance-none transition-all font-body">
                      <option value="gpt-4o-mini">GPT-4o-mini (Zoptymalizowany)</option>
                      <option value="gpt-4o">GPT-4o (Pełna moc)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                      <span className="material-symbols-outlined">unfold_more</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <p className="text-[11px] text-tertiary">Polecane dla szybkości i precyzji językowej.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  Zapisz Zmiany
                  <span className="material-symbols-outlined">save</span>
                </button>
              </div>
            </form>
            
            {/* Subtle decorative background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Bezpieczeństwo</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Twoje dane są bezpieczne. Klucz API jest przechowywany wyłącznie w pamięci podręcznej Twojej przeglądarki (localStorage).</p>
            </div>
          </div>
          
          <div className="bg-surface-container-high p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary-dim flex-shrink-0">
              <span className="material-symbols-outlined">help</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Skąd wziąć klucz?</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Możesz wygenerować klucz na platformie OpenAI: <br/>
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary hover:underline font-bold"
                >
                  platform.openai.com/api-keys
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;
