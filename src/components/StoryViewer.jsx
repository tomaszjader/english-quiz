import { AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpenText, Languages, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { normalizeLookup, tokenizeStory } from '../utils/quiz';

const StoryViewer = ({ loading, onStartQuiz, story }) => {
  const [selectedWord, setSelectedWord] = useState('');
  const [showTranslations, setShowTranslations] = useState(false);

  const highlightedWords = useMemo(
    () => new Set(story.targetWords.map((word) => normalizeLookup(word))),
    [story.targetWords],
  );

  const tokens = useMemo(() => tokenizeStory(story.content), [story.content]);

  const selectedTranslation = useMemo(() => {
    const originalWord = story.targetWords.find((word) => normalizeLookup(word) === selectedWord);
    return originalWord ? story.wordTranslations?.[originalWord] : '';
  }, [selectedWord, story.targetWords, story.wordTranslations]);

  return (
    <section
      className="panel story-layout"
    >
      <div className="story-main stack-lg">
        <div className="section-head">
          <div className="stack-sm">
            <p className="eyebrow">Generated story</p>
            <h2>{story.title}</h2>
          </div>

          <button
            className="button button-secondary"
            type="button"
            onClick={() => setShowTranslations((value) => !value)}
          >
            <Languages size={18} />
            {showTranslations ? 'Ukryj tlumaczenia' : 'Pokaz tlumaczenia'}
          </button>
        </div>

        <article className="story-content">
          <div className="story-icon">
            <BookOpenText size={18} />
          </div>
          <p>
            {tokens.map((token, index) => {
              const normalized = normalizeLookup(token);
              const isTarget = normalized && highlightedWords.has(normalized);

              if (!isTarget) {
                return <span key={`${token}-${index}`}>{token}</span>;
              }

              return (
                <button
                  key={`${token}-${index}`}
                  type="button"
                  className="word-highlight"
                  onClick={() => setSelectedWord(normalized)}
                >
                  {token}
                </button>
              );
            })}
          </p>
        </article>
      </div>

      <aside className="story-sidebar stack-md">
        <div className="panel panel-subtle stack-md">
          <div className="stack-xs">
            <p className="eyebrow">Target words</p>
            <h3>Slownictwo z historii</h3>
          </div>

          <div className="chip-list">
            {story.targetWords.map((word) => {
              const isActive = selectedWord === normalizeLookup(word);
              const translation = story.wordTranslations?.[word];

              return (
                <button
                  key={word}
                  type="button"
                  className={`chip ${isActive ? 'chip-active' : ''}`}
                  onClick={() => setSelectedWord(normalizeLookup(word))}
                >
                  <strong>{word}</strong>
                  {showTranslations || isActive ? <span>{translation || 'Brak tlumaczenia'}</span> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="cta-card">
          <p className="eyebrow">Next step</p>
          <h3>Sprawdz, ile zapamietales.</h3>
          <p className="muted">Quiz powstanie na podstawie tej historii i uzytych slow.</p>
          <button className="button button-primary button-large" type="button" onClick={onStartQuiz} disabled={loading}>
            {loading ? 'Tworze quiz...' : 'Rozpocznij quiz'}
            <ArrowRight size={18} />
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {selectedWord ? (
          <div
            className="modal-backdrop"
            onClick={() => setSelectedWord('')}
          >
            <div
              className="modal-card"
              onClick={(event) => event.stopPropagation()}
            >
              <button className="icon-button" type="button" onClick={() => setSelectedWord('')}>
                <X size={18} />
              </button>
              <p className="eyebrow">Translation</p>
              <h3>{story.targetWords.find((word) => normalizeLookup(word) === selectedWord)}</h3>
              <p className="muted">{selectedTranslation || 'Brak tlumaczenia'}</p>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default StoryViewer;
