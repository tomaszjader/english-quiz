import React, { useState, useEffect } from 'react';
import VocabularyInput from './components/VocabularyInput';
import StoryViewer from './components/StoryViewer';
import QuizSection from './components/QuizSection';
import ApiKeySetup from './components/ApiKeySetup';
import { AIService } from './services/AIService';
import { Sparkles, GraduationCap, Settings, LogOut, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key'));
  const [step, setStep] = useState(apiKey ? 'input' : 'setup'); // 'setup', 'input', 'generating', 'story', 'quiz'
  const [words, setWords] = useState([]);
  const [story, setStory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveKey = (key) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setStep('input');
  };

  const handleClearKey = () => {
    if (window.confirm('Czy na pewno chcesz usunąć klucz API?')) {
      localStorage.removeItem('openai_api_key');
      setApiKey(null);
      setStep('setup');
      setShowSettings(false);
    }
  };

  const handleGenerateStory = async (inputWords, category) => {
    setLoading(true);
    setStep('generating');
    setWords(inputWords);
    
    try {
      const generatedStory = await AIService.generateStory(inputWords, category, 'medium', apiKey);
      setStory(generatedStory);
      setStep('story');
    } catch (error) {
      console.error("Failed to generate story:", error);
      alert('Błąd generowania historii. Sprawdź swój klucz API.');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    setLoading(true);
    try {
      const generatedQuestions = await AIService.generateQuestions(story, apiKey);
      setQuestions(generatedQuestions);
      setStep('quiz');
    } catch (error) {
      console.error("Failed to generate questions:", error);
      alert('Błąd generowania pytań. Sprawdź swój klucz API.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep('input');
    setWords([]);
    setStory(null);
    setQuestions([]);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-16 text-center relative">
        {apiKey && (
          <div className="absolute top-0 right-0">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-slate-400 hover:text-cyan-400"
            >
              <Settings size={24} />
            </button>
            <AnimatePresence>
              {showSettings && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-14 right-0 w-48 glass-card border border-white/10 p-2 z-50 overflow-hidden"
                >
                  <button 
                    onClick={handleClearKey}
                    className="w-full flex items-center gap-3 p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <LogOut size={16} /> Usuń Klucz API
                  </button>
                  <button 
                    onClick={handleRestart}
                    className="w-full flex items-center gap-3 p-3 text-sm text-slate-300 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <RefreshCw size={16} /> Zacznij Od Nowa
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="text-cyan-400" size={18} />
          <span className="text-sm font-medium tracking-wide outfit text-cyan-200 uppercase">AI-Powered Language Learning</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-black mb-4 outfit tracking-tighter"
        >
          AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 animate-gradient">Vocabulary</span> Learning App
        </motion.h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Opanuj nowe słownictwo dzięki spersonalizowanym historiom i inteligentnym quizom.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'setup' && (
            <ApiKeySetup key="setup" onSave={handleSaveKey} />
          )}

          {step === 'input' && (
            <VocabularyInput 
              key="input"
              onGenerate={handleGenerateStory} 
              initialWords={words} 
            />
          )}

          {step === 'generating' && (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-20"
            >
              <div className="relative w-24 h-24 mb-8">
                <motion.div 
                  className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-t-cyan-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Tworzenie Twojej historii...</h2>
              <p className="text-slate-400">Nasz AI (GPT-4o-mini) łączy Twoje słówka w spójną opowieść.</p>
            </motion.div>
          )}

          {step === 'story' && story && (
            <StoryViewer 
              key="story"
              story={story} 
              onStartQuiz={handleStartQuiz} 
            />
          )}

          {step === 'quiz' && (
            <QuizSection 
              key="quiz"
              questions={questions} 
              story={story} 
              onRestart={handleRestart} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-20 text-center opacity-30 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <GraduationCap size={16} />
          <span>Made for learning with ❤️</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
