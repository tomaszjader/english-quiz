import { ArrowRight, CheckCircle2, Lightbulb, RefreshCw, Trophy, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Question, Story } from '../types';

interface QuizSectionProps {
  onRestart: () => void;
  questions: Question[];
  story: Story | null;
}

const QuizSection = ({ onRestart, questions, story }: QuizSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = useMemo(
    () => (questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0),
    [currentIndex, questions.length],
  );

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) {
      return;
    }

    setSelectedOption(optionIndex);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedOption(null);
    setShowHint(false);
  };

  if (!currentQuestion) {
    return (
      <section className="panel centered stack-sm">
        <h2>Brakuje pytan do quizu.</h2>
        <p className="muted">Wroc do historii i wygeneruj quiz jeszcze raz.</p>
        <button className="button button-primary" type="button" onClick={onRestart}>
          Zacznij od nowa
        </button>
      </section>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / questions.length) * 100);

    return (
      <section
        className="panel centered stack-lg"
      >
        <div className="icon-badge icon-badge-primary">
          <Trophy size={32} />
        </div>
        <div className="stack-sm">
          <p className="eyebrow">Quiz summary</p>
          <h2>Wynik: {score} / {questions.length}</h2>
          <p className="muted">
            Skutecznosc {accuracy}%. Quiz byl oparty na historii "{story?.title}".
          </p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <CheckCircle2 size={20} />
            <span>Poprawne</span>
            <strong>{score}</strong>
          </article>
          <article className="stat-card">
            <XCircle size={20} />
            <span>Bledne</span>
            <strong>{questions.length - score}</strong>
          </article>
        </div>

        <button className="button button-primary button-large" type="button" onClick={onRestart}>
          <RefreshCw size={18} />
          Zacznij nowa sesje
        </button>
      </section>
    );
  }

  return (
    <section
      className="panel stack-lg"
    >
      <div className="stack-sm">
        <div className="section-head compact">
          <p className="eyebrow">
            Pytanie {currentIndex + 1} z {questions.length}
          </p>
          <strong>{Math.round(progress)}%</strong>
        </div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="stack-md">
        <div className="stack-xs">
          <p className="eyebrow">Typ: {currentQuestion.type}</p>
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="quiz-options">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = optionIndex === selectedOption;
            const isCorrect = optionIndex === currentQuestion.correctAnswer;
            const isLocked = selectedOption !== null;

            let stateClass = '';

            if (isLocked && isCorrect) {
              stateClass = 'quiz-option-correct';
            } else if (isLocked && isSelected) {
              stateClass = 'quiz-option-wrong';
            }

            return (
              <button
                key={option}
                type="button"
                className={`quiz-option ${stateClass}`}
                onClick={() => handleAnswer(optionIndex)}
                disabled={isLocked}
              >
                <span>{option}</span>
                {isLocked && isCorrect ? <CheckCircle2 size={18} /> : null}
                {isLocked && isSelected && !isCorrect ? <XCircle size={18} /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="action-row">
        <button className="button button-secondary" type="button" onClick={() => setShowHint((value) => !value)}>
          <Lightbulb size={18} />
          {showHint ? 'Ukryj podpowiedz' : 'Pokaz podpowiedz'}
        </button>

        {selectedOption !== null ? (
          <button className="button button-primary" type="button" onClick={handleNext}>
            {currentIndex === questions.length - 1 ? 'Zobacz wynik' : 'Nastepne pytanie'}
            <ArrowRight size={18} />
          </button>
        ) : null}
      </div>

      {showHint && currentQuestion.hint ? <div className="hint-box">{currentQuestion.hint}</div> : null}
    </section>
  );
};

export default QuizSection;
