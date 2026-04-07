import { useState, useCallback } from 'react';
import { AIService } from '../services/AIService';

export const useQuiz = () => {
    const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key'));
    const [step, setStep] = useState(apiKey ? 'input' : 'setup'); // 'setup', 'input', 'generating', 'story', 'quiz'
    const [words, setWords] = useState([]);
    const [story, setStory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSaveKey = useCallback((key) => {
        localStorage.setItem('openai_api_key', key);
        setApiKey(key);
        setStep('input');
        setError(null);
    }, []);

    const handleClearKey = useCallback(() => {
        localStorage.removeItem('openai_api_key');
        setApiKey(null);
        setStep('setup');
    }, []);

    const generateStory = useCallback(async (inputWords, category) => {
        setLoading(true);
        setError(null);
        setStep('generating');
        setWords(inputWords);
        
        try {
            const generatedStory = await AIService.generateStory(inputWords, category, 'medium', apiKey);
            setStory(generatedStory);
            setStep('story');
        } catch (err) {
            console.error("Failed to generate story:", err);
            setError('Błąd generowania historii. Sprawdź swój klucz API.');
            setStep('input');
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    const startQuiz = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const generatedQuestions = await AIService.generateQuestions(story, apiKey);
            setQuestions(generatedQuestions);
            setStep('quiz');
        } catch (err) {
            console.error("Failed to generate questions:", err);
            setError('Błąd generowania pytań. Sprawdź swój klucz API.');
        } finally {
            setLoading(false);
        }
    }, [story, apiKey]);

    const restart = useCallback(() => {
        setStep('input');
        setWords([]);
        setStory(null);
        setQuestions([]);
        setError(null);
    }, []);

    return {
        step,
        setStep,
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
    };
};
