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
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setShowHint(false);
  };

  if (!currentQuestion && !finished) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center glass-panel rounded-3xl border border-white/5">
        <h2 className="text-2xl font-headline font-bold mb-4">Brakuje pytań do quizu.</h2>
        <button onClick={onRestart} className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold">
          Zacznij od nowa
        </button>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="text-center space-y-4">
           <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-2xl shadow-primary/20">
              <span className="material-symbols-outlined text-4xl">emoji_events</span>
           </div>
           <h1 className="text-4xl font-headline font-extrabold tracking-tight">Sesja Ukończona!</h1>
           <p className="text-on-surface-variant max-w-md mx-auto">
              Świetna robota! Utwierdziłeś swoją wiedzę na podstawie historii "{story?.title}".
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(182,160,255,0.4)]">{score} / {questions.length}</span>
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-2">Twój Wynik</span>
           </div>
           <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-tertiary-dim drop-shadow-[0_0_15px_rgba(46,239,188,0.3)]">{accuracy}%</span>
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-2">Skuteczność</span>
           </div>
        </div>

        <div className="flex justify-center pt-8">
           <button 
             onClick={onRestart}
             className="px-12 py-5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
           >
             Rozpocznij Nową Sesję
             <span className="material-symbols-outlined">refresh</span>
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Progress Header */}
      <div className="max-w-4xl mx-auto mb-10 px-2 md:px-0">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-primary-dim font-headline font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">Postęp Quizu</span>
            <h1 className="text-xl md:text-3xl font-headline font-extrabold mt-1">Sprawdź Pamięć</h1>
          </div>
          <div className="text-right">
            <span className="text-on-surface-variant font-bold text-sm md:text-base">{currentIndex + 1} / {questions.length}</span>
            <p className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest leading-none">Pytania</p>
          </div>
        </div>
        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_10px_rgba(182,160,255,0.4)] transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Main Question Card --> Responsive Padding */}
        <div className="xl:col-span-8 glass-panel rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group luminous-glow border border-white/5 min-h-[400px] md:min-h-[500px] flex flex-col">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="px-3 py-1 bg-secondary-container/30 text-secondary-dim text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-md border border-secondary-dim/20">
                Pytanie: {currentQuestion.type}
              </span>
            </div>

            <div className="flex-1">
              <p className="text-lg md:text-2xl leading-relaxed text-on-surface/90 font-body mb-8 md:mb-12 italic border-l-4 border-primary/40 pl-4 md:pl-6 py-2">
                "{currentQuestion.question}"
              </p>

              {/* Options Grid --> Responsive Sizing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-auto">
                {currentQuestion.options.map((option, idx) => {
                  const isLocked = selectedOption !== null;
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctAnswer;

                  let cardClass = "bg-surface-container-high border-white/5 hover:bg-surface-bright";
                  let markerClass = "bg-surface-container text-primary-dim group-hover:bg-primary-dim group-hover:text-on-primary";

                  if (isLocked) {
                    if (isCorrect) {
                       cardClass = "bg-tertiary/10 border-tertiary-dim/40 text-tertiary-dim";
                       markerClass = "bg-tertiary-dim text-on-tertiary-fixed";
                    } else if (isSelected) {
                       cardClass = "bg-error/10 border-error/40 text-error";
                       markerClass = "bg-error text-white";
                    } else {
                       cardClass = "bg-surface-container-high/50 border-white/5 opacity-50";
                    }
                  }

                  return (
                    <button 
                      key={idx}
                      disabled={isLocked}
                      onClick={() => handleAnswer(idx)}
                      className={`group relative flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl transition-all duration-300 text-left border ${cardClass}`}
                    >
                      <span className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl font-headline font-bold transition-colors ${markerClass} text-sm md:text-base`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-headline font-bold text-base md:text-lg">{option}</span>
                      {isLocked && isCorrect && <span className="material-symbols-outlined ml-auto text-tertiary-dim text-xl">check_circle</span>}
                      {isLocked && isSelected && !isCorrect && <span className="material-symbols-outlined ml-auto text-error text-xl">cancel</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-white/5 relative group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-tertiary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary-dim text-lg">auto_awesome</span>
              </div>
              <h3 className="font-headline font-bold text-on-surface">Asystent AI</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              {showHint && currentQuestion.hint 
                ? currentQuestion.hint 
                : "Potrzebujesz wskazówki? Mogę podpowiedzieć znaczenie lub synonim, aby pomóc Ci połączyć fakty."
              }
            </p>
            <button 
              onClick={() => setShowHint(!showHint)}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${showHint ? 'bg-tertiary-dim text-on-tertiary-fixed' : 'bg-surface-bright text-primary hover:shadow-[0_0_20px_rgba(182,160,255,0.2)]'}`}
            >
              <span className="material-symbols-outlined text-sm">{showHint ? 'visibility_off' : 'lightbulb'}</span>
              {showHint ? 'Ukryj Podpowiedź' : 'Pokaż Podpowiedź'}
            </button>
          </div>

          {/* Quiz stats summary box */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-high rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5">
              <span className="text-2xl font-black text-tertiary-dim">{Math.round((score / (currentIndex || 1)) * 100)}%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Aktualna Celność</span>
            </div>
            <div className="bg-surface-container-high rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5">
              <span className="text-2xl font-black text-secondary">{score}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Poprawne Odp.</span>
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden relative h-48 group border border-white/5 shadow-xl">
             <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPicyAqjzhqBy2Da5OQH8pVNe_Dst06uf8GEZM_DRPQia21W-u-Aseytry8gGvfSrhnWVpHD6lXreXnL5VG-MJvLUEXHYC4jfhnEe1L0ValUpr5WWKivHqd7YBSE8BFfE6Bsp0dKezOnCfK13J-vyAZ7pAQNyLrJNujsrnEgb-nrOynF4TC78JmwXUXlZ3WCrgabm6szmbTtRETuesfs3B1n4nXMmGGFHF3PNY2RH9Ff1YTHRx-1B4-YePz20tLhTEogM4ussPBHk" alt="Visual Prompt"/>
             <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-60" />
             <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-sm">Inspiracja Wizualna</p>
                <p className="text-white/60 text-[10px]">Buduj skojarzenia wizualne ze słownictwem.</p>
             </div>
          </div>

          <div className="pt-4">
            {selectedOption !== null && (
              <button 
                onClick={handleNext}
                className="w-full px-8 py-5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {currentIndex === questions.length - 1 ? 'Podsumuj Sesję' : 'Następne Pytanie'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
