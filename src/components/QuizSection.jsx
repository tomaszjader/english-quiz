import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RefreshCcw, HelpCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizSection = ({ questions, story, onRestart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer || (typeof index === 'boolean' && index === currentQuestion.correctAnswer)) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center max-w-2xl mx-auto"
      >
        <div className="bg-yellow-400/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-yellow-400">
          <Award size={48} />
        </div>
        <h2 className="text-4xl font-bold mb-4 outfit">Quiz ukończony!</h2>
        <p className="text-xl text-slate-400 mb-8">
          Twój wynik: <span className="text-cyan-400 font-bold">{score}</span> / <span className="text-cyan-400 font-bold">{questions.length}</span>
        </p>
        <div className="flex gap-4 justify-center">
            <button 
            onClick={onRestart}
            className="btn-primary flex items-center gap-2"
            >
            <RefreshCcw size={20} /> Spróbuj ponownie
            </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 px-4">
        <span className="text-slate-400 font-medium tracking-wide outfit uppercase text-xs">Pytanie {currentQuestionIndex + 1} z {questions.length}</span>
        <div className="h-2 w-48 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-10 relative overflow-hidden"
        >
          <div className="flex items-start gap-4 mb-8">
            <HelpCircle className="text-magenta-400 mt-1" size={28} />
            <h3 className="text-2xl font-bold leading-tight outfit">{currentQuestion.question}</h3>
          </div>

          <div className="space-y-4 mb-10">
            {currentQuestion.type === 'true-false' ? (
              <div className="grid grid-cols-2 gap-4">
                {[true, false].map((val) => (
                    <button
                        key={val.toString()}
                        onClick={() => handleOptionSelect(val)}
                        className={`p-6 rounded-2xl border-2 transition-all text-xl font-bold outfit ${
                            isAnswered 
                                ? (val === currentQuestion.correctAnswer ? 'bg-green-500/20 border-green-500/50 text-green-400' : (val === selectedOption ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/5 opacity-50'))
                                : 'bg-white/5 border-white/10 hover:border-cyan-400/50 hover:bg-white/10'
                        }`}
                    >
                        {val ? 'TRUE' : 'FALSE'}
                    </button>
                ))}
              </div>
            ) : (
              currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                    isAnswered 
                      ? (idx === currentQuestion.correctAnswer ? 'bg-green-500/20 border-green-500/50 text-green-400' : (idx === selectedOption ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/5 opacity-50'))
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/50 hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg font-medium">{option}</span>
                  {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle2 size={24} />}
                  {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle size={24} />}
                </button>
              ))
            )}
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence>
                {showHint && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-cyan-500/10 border border-cyan-400/20 p-4 rounded-xl text-cyan-200 text-sm italic mb-4 flex items-start gap-2"
                    >
                        <Lightbulb size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{currentQuestion.hint}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex gap-4">
                {!isAnswered && (
                    <button 
                        onClick={() => setShowHint(!showHint)}
                        className={`flex-1 py-4 px-6 rounded-2xl border border-dashed border-white/20 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-all flex items-center justify-center gap-2 font-medium ${showHint ? 'bg-white/10' : ''}`}
                    >
                        <Lightbulb size={20} />
                        {showHint ? 'Ukryj podpowiedź' : 'Potrzebujesz podpowiedzi?'}
                    </button>
                )}
                
                {isAnswered && (
                    <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleNext}
                        className="btn-primary flex-1 py-4 text-xl"
                    >
                        {currentQuestionIndex + 1 === questions.length ? 'Zakończ Quiz' : 'Następne Pytanie'}
                    </motion.button>
                )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizSection;
