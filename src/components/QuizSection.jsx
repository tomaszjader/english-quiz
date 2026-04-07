import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight, Lightbulb } from 'lucide-react';

const QuizSection = ({ questions, story, onRestart }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const currentQuestion = questions[currentIdx];

    const handleAnswer = (optionIdx) => {
        if (isAnswered) return;
        
        setSelectedOption(optionIdx);
        setIsAnswered(true);
        if (optionIdx === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setShowHint(false);
        } else {
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center"
            >
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Trophy size={80} className="mx-auto text-magenta-400 mb-8 animate-bounce" />
                    <h2 className="text-5xl font-black outfit mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400">
                        Niesamowity Wynik!
                    </h2>
                    <p className="text-2xl text-slate-400 mb-12">
                        Twój wynik to <span className="font-black text-cyan-400">{score}</span> / <span className="text-slate-500">{questions.length}</span>
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                            <CheckCircle2 size={32} className="mx-auto text-cyan-400 mb-4" />
                            <h3 className="font-bold text-lg mb-1">Poprawne</h3>
                            <p className="text-3xl font-black text-cyan-400">{score}</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                            <XCircle size={32} className="mx-auto text-red-400 mb-4" />
                            <h3 className="font-bold text-lg mb-1">Błędne</h3>
                            <p className="text-3xl font-black text-red-400">{questions.length - score}</p>
                        </div>
                    </div>

                    <button 
                        onClick={onRestart}
                        className="btn-primary w-full max-w-sm flex items-center justify-center gap-3 text-lg py-5 rounded-2xl mx-auto"
                    >
                        <RefreshCw size={24} />
                        Zacznij Od Nowa
                    </button>
                </motion.div>
            </motion.div>
        );
    }

    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-black uppercase tracking-widest text-slate-500">Pytanie {currentIdx + 1} z {questions.length}</span>
                    <span className="text-sm font-bold text-cyan-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-magenta-400 shadow-glow"
                    />
                </div>
            </div>

            <motion.div 
                key={currentIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-card p-10 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 shadow-glow" />
                
                <h3 className="text-2xl md:text-3xl font-black outfit mb-10 leading-tight">
                    {currentQuestion.question}
                </h3>

                <div className="space-y-4 mb-10">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === currentQuestion.correctAnswer;
                        
                        let cardClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
                        if (isAnswered) {
                            if (isCorrect) cardClass = "bg-cyan-400/10 border-cyan-400/50 text-cyan-200 ring-1 ring-cyan-400/20";
                            else if (isSelected) cardClass = "bg-red-400/10 border-red-400/50 text-red-200 ring-1 ring-red-400/20";
                            else cardClass = "opacity-40 grayscale";
                        }

                        return (
                            <button 
                                key={idx}
                                disabled={isAnswered}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full text-left p-6 rounded-2xl border flex items-center justify-between transition-all font-medium text-lg ${cardClass}`}
                            >
                                <span>{option}</span>
                                <AnimatePresence>
                                    {isAnswered && (isCorrect || isSelected) && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            {isCorrect ? <CheckCircle2 className="text-cyan-400" /> : <XCircle className="text-red-400" />}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                    <button 
                        onClick={() => setShowHint(!showHint)}
                        className={`text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${showHint ? 'text-magenta-400 bg-magenta-400/10 shadow-glow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Lightbulb size={18} />
                        {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
                    </button>

                    {isAnswered && (
                        <button 
                            onClick={handleNext}
                            className="btn-primary flex items-center gap-2 group w-full md:w-auto overflow-hidden relative"
                        >
                            <span>Kontynuuj</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showHint && currentQuestion.hint && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 p-4 bg-magenta-400/5 border border-magenta-400/20 rounded-xl text-sm italic text-slate-300 text-center"
                        >
                            💡 Wskazówka: {currentQuestion.hint}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default QuizSection;
