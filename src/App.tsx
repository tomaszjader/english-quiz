import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import ApiKeySetup from './components/ApiKeySetup'; // Keep for initial flow
import SettingsView from './components/SettingsView';
import Layout from './components/Layout';
import QuizSection from './components/QuizSection';
import StoryViewer from './components/StoryViewer';
import VocabularyInput from './components/VocabularyInput';
import { APP_STEP } from './constants/app';
import { useQuiz } from './hooks/useQuiz';

const screenVariants: Variants = {
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  initial: { opacity: 0, scale: 1.02 },
};

const LoadingScreen = () => (
  <motion.div
    className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8"
    variants={screenVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div className="relative">
      <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-pulse">auto_awesome</span>
      </div>
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-tertiary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary/20 rounded-full blur-xl animate-pulse delay-700" />
    </div>
    
    <div className="space-y-3">
      <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">Tkamy Twoją Opowieść...</h2>
      <p className="text-on-surface-variant max-w-sm italic">
        Nasza AI łączy Twoje słownictwo w unikalną narrację, która ułatwi zapamiętywanie.
      </p>
    </div>
  </motion.div>
);

function App() {
  const {
    apiKey,
    error,
    loading,
    questions,
    step,
    story,
    words,
    targetLanguage,
    history,
    generateStory,
    handleClearKey,
    handleSaveKey,
    restart,
    saveWords,
    startQuiz,
    setTargetLanguage,
    setStep,
    clearError,
  } = useQuiz();

  // Map app steps to sidebar/layout steps
  const getCurrentStep = () => {
    switch (step) {
      case APP_STEP.SETUP: return 'settings';
      case APP_STEP.INPUT: return 'hub';
      case APP_STEP.GENERATING: return 'hub';
      case APP_STEP.STORY: return 'stories';
      case APP_STEP.QUIZ: return 'quiz';
      default: return 'hub';
    }
  };

  return (
    <Layout currentStep={getCurrentStep()} onNavigate={setStep}>
      <div className="app-shell relative">
        <AnimatePresence mode="wait">
          {step === APP_STEP.SETUP && (
            <motion.div key="setup" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              {apiKey ? (
                <SettingsView 
                  apiKey={apiKey}
                  targetLanguage={targetLanguage}
                  history={history}
                  onSaveKey={handleSaveKey}
                  onClearKey={handleClearKey}
                  onSetLanguage={setTargetLanguage}
                  onNavigate={setStep}
                />
              ) : (
                <ApiKeySetup onSave={handleSaveKey} />
              )}
            </motion.div>
          )}
          
          {step === APP_STEP.INPUT && (
            <motion.div key="input" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              <VocabularyInput
                initialWords={words}
                onGenerate={generateStory}
                onSave={saveWords}
              />
            </motion.div>
          )}
          
          {step === APP_STEP.GENERATING && <LoadingScreen key="generating" />}
          
          {step === APP_STEP.STORY && story && (
            <motion.div key="story" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              <StoryViewer loading={loading} onStartQuiz={startQuiz} story={story} />
            </motion.div>
          )}
          
          {step === APP_STEP.QUIZ && (
            <motion.div key="quiz" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              <QuizSection onRestart={restart} questions={questions} story={story} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              className="fixed bottom-8 right-8 z-50 bg-error-container text-on-error-container p-4 rounded-2xl shadow-2xl border border-error/20 flex items-center gap-3 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <span className="material-symbols-outlined">error</span>
              <p className="font-bold text-sm">{error}</p>
              <button
                onClick={clearError}
                className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default App;
