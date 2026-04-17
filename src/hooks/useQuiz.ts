import { useCallback, useState } from 'react';
import { APP_STEP, STORAGE_KEY } from '../constants/app';
import {
  generateQuestions as requestQuestions,
  generateStory as requestStory,
} from '../services/AIService';
import type { AppStep, Question, Story, WordEntry, UseQuizReturn } from '../types';
import {
  normalizeQuestions,
  normalizeStory,
  sanitizeWords,
} from '../utils/quiz';

const readStoredApiKey = (): string => localStorage.getItem(STORAGE_KEY.OPENAI_API_KEY) || '';

const readStoredWords = (): WordEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY.WORDS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse stored words:', e);
    return [];
  }
};

export const useQuiz = (): UseQuizReturn => {
  const [apiKey, setApiKey] = useState<string>(readStoredApiKey);
  const [step, setStep] = useState<AppStep>(apiKey ? APP_STEP.INPUT : APP_STEP.SETUP);
  const [words, setWords] = useState<WordEntry[]>(readStoredWords);
  const [story, setStory] = useState<Story | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const resetSession = useCallback(() => {
    setWords([]);
    setStory(null);
    setQuestions([]);
    setLoading(false);
    setError('');
  }, []);

  const handleSaveKey = useCallback(
    (key: string) => {
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
    async (inputWords: WordEntry[], category: string) => {
      const nextWords = sanitizeWords(inputWords);

      setLoading(true);
      setError('');
      setWords(nextWords);
      localStorage.setItem(STORAGE_KEY.WORDS, JSON.stringify(nextWords));
      setStep(APP_STEP.GENERATING);

      try {
        const response = await requestStory(nextWords, category, apiKey);
        setStory(normalizeStory(response, nextWords));
        setQuestions([]);
        setStep(APP_STEP.STORY);
      } catch (requestError) {
        console.error('Failed to generate story:', requestError);
        setError((requestError as Error).message || 'Nie udalo sie wygenerowac historii.');
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
      setError((requestError as Error).message || 'Nie udalo sie wygenerowac pytan.');
    } finally {
      setLoading(false);
    }
  }, [apiKey, story]);

  const restart = useCallback(() => {
    resetSession();
    setStep(apiKey ? APP_STEP.INPUT : APP_STEP.SETUP);
    setWords(readStoredWords());
  }, [apiKey, resetSession]);

  const saveWords = useCallback((nextWords: WordEntry[]) => {
    const sanitized = sanitizeWords(nextWords);
    setWords(sanitized);
    localStorage.setItem(STORAGE_KEY.WORDS, JSON.stringify(sanitized));
  }, []);

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
    saveWords,
    startQuiz,
  };
};
