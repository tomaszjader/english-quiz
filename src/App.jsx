import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import VocabularyInput from './components/VocabularyInput';
import StoryViewer from './components/StoryViewer';
import QuizSection from './components/QuizSection';
import ApiKeySetup from './components/ApiKeySetup';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';

// Hooks
import { useQuiz } from './hooks/useQuiz';

function App() {
    const {
        step,
        apiKey,
        words,
        story,
        questions,
        loading,
        error,
        handleSaveKey,
        handleClearKey,
        generateStory,
        startQuiz,
        restart,
    } = useQuiz();

    return (
        <Layout>
            <Header 
                apiKey={apiKey} 
                onClearKey={handleClearKey} 
                onRestart={restart} 
            />

            <main className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 'setup' && (
                        <ApiKeySetup key="setup" onSave={handleSaveKey} />
                    )}

                    {step === 'input' && (
                        <VocabularyInput 
                            key="input"
                            onGenerate={generateStory} 
                            initialWords={words} 
                        />
                    )}

                    {step === 'generating' && (
                        <motion.div 
                            key="generating"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex flex-col items-center justify-center p-20 glass-card"
                        >
                            <div className="relative w-32 h-32 mb-12">
                                <motion.div 
                                    className="absolute inset-0 border-[6px] border-cyan-400/10 rounded-full"
                                />
                                <motion.div 
                                    className="absolute inset-0 border-[6px] border-t-cyan-400 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                />
                                <motion.div 
                                    className="absolute inset-4 border-[6px] border-b-magenta-400 rounded-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>
                            <h2 className="text-3xl font-black mb-4 outfit">Tworzenie opowieści...</h2>
                            <p className="text-slate-400 text-center max-w-sm leading-relaxed">
                                Nasz AI (GPT-4o-mini) łączy Twoje słówka <br />w spójną, angażującą historię.
                            </p>
                        </motion.div>
                    )}

                    {step === 'story' && story && (
                        <StoryViewer 
                            key="story"
                            story={story} 
                            onStartQuiz={startQuiz} 
                            loading={loading}
                        />
                    )}

                    {step === 'quiz' && (
                        <QuizSection 
                            key="quiz"
                            questions={questions} 
                            story={story} 
                            onRestart={restart} 
                        />
                    )}
                </AnimatePresence>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center text-sm"
                    >
                        {error}
                    </motion.div>
                )}
            </main>

            <Footer />
        </Layout>
    );
}

export default App;
