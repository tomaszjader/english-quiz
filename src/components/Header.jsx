import { AnimatePresence } from 'framer-motion';
import { KeyRound, RefreshCw, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const Header = ({ apiKey, onClearKey, onRestart }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="page-header">
      <div className="brand-block">
        <div className="brand-mark">
          <Logo className="logo-mark" />
        </div>

        <div className="stack-sm centered">
          <p className="eyebrow">AI English Quiz</p>
          <h1>Ucz sie slowek przez historie i quizy generowane przez AI.</h1>
          <p className="muted centered max-copy">
            Dodajesz slowa, aplikacja tworzy opowiesc, a na koniec sprawdza zapamietanie w quizie.
          </p>
        </div>
      </div>

      {apiKey ? (
        <div className="settings-wrap">
          <button
            className="icon-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Ustawienia sesji"
          >
            <Settings size={18} />
          </button>

          <AnimatePresence>
            {open ? (
              <motion.div
                className="settings-card"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
              >
                <p className="eyebrow">Session</p>
                <div className="stack-xs">
                  <button
                    className="menu-button"
                    type="button"
                    onClick={() => {
                      onRestart();
                      setOpen(false);
                    }}
                  >
                    <RefreshCw size={16} />
                    Zresetuj sesje
                  </button>
                  <button
                    className="menu-button danger"
                    type="button"
                    onClick={() => {
                      onClearKey();
                      setOpen(false);
                    }}
                  >
                    <Trash2 size={16} />
                    Usun klucz API
                  </button>
                </div>
                <div className="api-hint">
                  <KeyRound size={14} />
                  <span>Klucz zapisany lokalnie</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
