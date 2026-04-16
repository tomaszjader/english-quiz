import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import ApiKeySetup from './components/ApiKeySetup';
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';
import QuizSection from './components/QuizSection';
import StoryViewer from './components/StoryViewer';
import VocabularyInput from './components/VocabularyInput';
import { APP_STEP } from './constants/app';
import { useQuiz } from './hooks/useQuiz';

const screenVariants: Variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  initial: { opacity: 0, y: 12 },
};

const LoadingScreen = () => (
  <motion.section
    className="panel panel-loading"
    variants={screenVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div className="loader-orbit" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <p className="eyebrow">AI working</p>
    <h2>Tworze historie dopasowana do Twojego slownictwa.</h2>
    <p className="muted centered">
      Lacze nowe slowa w naturalna opowiesc, a potem przygotuje quiz do powtorki.
    </p>
  </motion.section>
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
    generateStory,
    handleClearKey,
    handleSaveKey,
    restart,
    saveWords,
    startQuiz,
  } = useQuiz();

  return (
    <Layout>
      <Header apiKey={apiKey} onClearKey={handleClearKey} onRestart={restart} />

      <main className="app-shell">
        <AnimatePresence mode="wait">
          {step === APP_STEP.SETUP && <ApiKeySetup key="setup" onSave={handleSaveKey} />}
          {step === APP_STEP.INPUT && (
            <VocabularyInput
              key="input"
              initialWords={words}
              onGenerate={generateStory}
              onSave={saveWords}
            />
          )}
          {step === APP_STEP.GENERATING && <LoadingScreen key="generating" />}
          {step === APP_STEP.STORY && story && (
            <StoryViewer key="story" loading={loading} onStartQuiz={startQuiz} story={story} />
          )}
          {step === APP_STEP.QUIZ && (
            <QuizSection key="quiz" onRestart={restart} questions={questions} story={story} />
          )}
        </AnimatePresence>

        {error ? (
          <motion.div
            className="feedback feedback-error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        ) : null}
      </main>

      <Footer />
    </Layout>
  );
}

export default App;
