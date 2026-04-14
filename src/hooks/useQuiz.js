import { useCallback, useState } from 'react';
import { APP_STEP, STORAGE_KEY } from '../constants/app';
import {
  generateQuestions as requestQuestions,
  generateStory as requestStory,
} from '../services/AIService';
import {
  normalizeQuestions,
  normalizeStory,
  sanitizeWords,
} from '../utils/quiz';

const readStoredApiKey = () => localStorage.getItem(STORAGE_KEY.OPENAI_API_KEY) || '';

export const useQuiz = () => {
  const [apiKey, setApiKey] = useState(readStoredApiKey);
  const [step, setStep] = useState(apiKey ? APP_STEP.INPUT : APP_STEP.SETUP);
  const [words, setWords] = useState([]);
  const [story, setStory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetSession = useCallback(() => {
    setWords([]);
    setStory(null);
    setQuestions([]);
    setLoading(false);
    setError('');
  }, []);

  const handleSaveKey = useCallback(
    (key) => {
      localStorage.setItem(STORAGE_KEY.OPENAI_API_KEY, key);
      setApiKey(key);
      resetSession();
      setStep(APP_STEP.INPUT);
    },
    [resetSession],
  );

  const handleClearKey = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY.OPENAI_API_KEY);
    setApiKey('');
    resetSession();
    setStep(APP_STEP.SETUP);
  }, [resetSession]);

  const generateStory = useCallback(
    async (inputWords, category) => {
      const nextWords = sanitizeWords(inputWords);

      setLoading(true);
      setError('');
      setWords(nextWords);
      setStep(APP_STEP.GENERATING);

      try {
        const response = await requestStory(nextWords, category, apiKey);
        setStory(normalizeStory(response, nextWords));
        setQuestions([]);
        setStep(APP_STEP.STORY);
      } catch (requestError) {
        console.error('Failed to generate story:', requestError);
        setError(requestError.message || 'Nie udalo sie wygenerowac historii.');
        setStep(APP_STEP.INPUT);
      } finally {
        setLoading(false);
      }
    },
    [apiKey],
  );

  const startQuiz = useCallback(async () => {
    if (!story) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await requestQuestions(story, apiKey);
      setQuestions(normalizeQuestions(response));
      setStep(APP_STEP.QUIZ);
    } catch (requestError) {
      console.error('Failed to generate questions:', requestError);
      setError(requestError.message || 'Nie udalo sie wygenerowac pytan.');
    } finally {
      setLoading(false);
    }
  }, [apiKey, story]);

  const restart = useCallback(() => {
    resetSession();
    setStep(apiKey ? APP_STEP.INPUT : APP_STEP.SETUP);
  }, [apiKey, resetSession]);

  return {
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
    startQuiz,
  };
};
