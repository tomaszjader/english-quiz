import { ArrowRight, ExternalLink, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const ApiKeySetup = ({ onSave }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!key.startsWith('sk-')) {
      setError('Klucz API powinien zaczynac sie od "sk-".');
      return;
    }

    onSave(key.trim());
  };

  return (
    <section
      className="panel hero-panel"
    >
      <div className="hero-grid">
        <div className="stack-lg">
          <div className="icon-badge icon-badge-primary">
            <KeyRound size={30} />
          </div>
          <div className="stack-sm">
            <p className="eyebrow">OpenAI setup</p>
            <h2>Dodaj swoj klucz API i uruchom generator historii.</h2>
            <p className="muted">
              Klucz zapisujemy lokalnie w przegladarce. Bez niego aplikacja nie moze tworzyc
              historii ani quizow.
            </p>
          </div>
        </div>

        <form className="stack-md" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="api-key">
            Klucz OpenAI
          </label>
          <div className="input-wrap">
            <LockKeyhole className="input-icon" size={18} />
            <input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={key}
              onChange={(event) => {
                setKey(event.target.value);
                setError('');
              }}
              className="input-control"
              autoComplete="off"
            />
          </div>

          {error ? <p className="feedback feedback-inline">{error}</p> : null}

          <button className="button button-primary button-large" type="submit">
            Zapisz klucz
            <ArrowRight size={18} />
          </button>

          <div className="info-grid">
            <article className="info-card">
              <ShieldCheck size={18} />
              <div>
                <h3>Bezpieczenstwo</h3>
                <p>Klucz trafia tylko do localStorage w tej przegladarce.</p>
              </div>
            </article>
            <article className="info-card">
              <ExternalLink size={18} />
              <div>
                <h3>Skad go wziac</h3>
                <p>
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">
                    platform.openai.com/api-keys
                  </a>
                </p>
              </div>
            </article>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApiKeySetup;
