import { Check, Plus, Save, Sparkles, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS, QUIZ_LIMITS } from '../constants/app';
import type { WordEntry } from '../types';
import { createWordEntry, sanitizeWords } from '../utils/quiz';

interface VocabularyInputProps {
  initialWords?: WordEntry[];
  onGenerate: (words: WordEntry[], category: string) => void;
  onSave?: (words: WordEntry[]) => void;
}

const VocabularyInput = ({ initialWords = [], onGenerate, onSave }: VocabularyInputProps) => {
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [words, setWords] = useState<WordEntry[]>(() =>
    initialWords.length ? sanitizeWords(initialWords) : [createWordEntry()],
  );

  const activeCategory = useMemo(
    () => CATEGORY_OPTIONS.find((option) => option.value === category),
    [category],
  );

  const updateWord = (id: string, field: keyof WordEntry, value: string) => {
    setWords((currentWords) =>
      currentWords.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    );
  };

  const addWord = () => {
    setWords((currentWords) =>
      currentWords.length >= QUIZ_LIMITS.MAX_WORDS ? currentWords : [...currentWords, createWordEntry()],
    );
  };

  const removeWord = (id: string) => {
    setWords((currentWords) =>
      currentWords.length === 1 ? currentWords : currentWords.filter((entry) => entry.id !== id),
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(words);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validWords = sanitizeWords(words);

    if (validWords.length < QUIZ_LIMITS.MIN_WORDS) {
      setError(`Dodaj co najmniej ${QUIZ_LIMITS.MIN_WORDS} slowka, aby wygenerowac historie.`);
      return;
    }

    setError('');
    onGenerate(validWords, category);
  };

  return (
    <section
      className="panel"
    >
      <div className="section-head">
        <div className="stack-sm">
          <p className="eyebrow">Vocabulary list</p>
          <h2>Zbuduj zestaw slow i wygeneruj historie.</h2>
          <p className="muted">{activeCategory?.description}</p>
        </div>

        <label className="stack-xs">
          <span className="field-label">Kategoria</span>
          <select className="select-control" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form className="stack-lg" onSubmit={handleSubmit}>
        <div className="word-list">
          {words.map((entry, index) => (
            <article className="word-card" key={entry.id}>
              <div className="word-card-grid">
                <label className="stack-xs">
                  <span className="field-label">Slowo {index + 1}</span>
                  <input
                    className="input-control"
                    placeholder="np. emerge"
                    value={entry.word}
                    onChange={(event) => updateWord(entry.id, 'word', event.target.value)}
                  />
                </label>

                <label className="stack-xs">
                  <span className="field-label">Tlumaczenie</span>
                  <input
                    className="input-control"
                    placeholder="opcjonalnie"
                    value={entry.translation}
                    onChange={(event) => updateWord(entry.id, 'translation', event.target.value)}
                  />
                </label>

                <label className="stack-xs">
                  <span className="field-label">Poziom</span>
                  <select
                    className="select-control"
                    value={entry.difficulty}
                    onChange={(event) => updateWord(entry.id, 'difficulty', event.target.value)}
                  >
                    {DIFFICULTY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className="icon-button icon-button-danger"
                  type="button"
                  onClick={() => removeWord(entry.id)}
                  aria-label={`Usun slowo ${index + 1}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {error ? <p className="feedback feedback-inline">{error}</p> : null}

        <div className="action-row">
          <button className="button button-secondary" type="button" onClick={addWord}>
            <Plus size={18} />
            Dodaj slowo
          </button>

          <button
            className={`button ${saveSuccess ? 'button-success' : 'button-secondary'}`}
            type="button"
            onClick={handleSave}
            disabled={!onSave}
          >
            {saveSuccess ? <Check size={18} /> : <Save size={18} />}
            {saveSuccess ? 'Zapisano!' : 'Zapisz liste'}
          </button>

          <button className="button button-primary button-large" type="submit">
            <Sparkles size={18} />
            Generuj historie
          </button>
        </div>
      </form>
    </section>
  );
};

export default VocabularyInput;
