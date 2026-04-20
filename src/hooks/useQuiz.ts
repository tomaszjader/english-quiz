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

const getErrorMessage = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  return 'Cos poszlo nie tak. Sprobuj ponownie.';
};

const isWordEntry = (v: unknown): v is WordEntry => {
  if (typeof v !== 'object' || v === null) return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.id === 'string' && typeof obj.word === 'string';
};

const readStoredApiKey = (): string => localStorage.getItem(STORAGE_KEY.OPENAI_API_KEY) || '';
const readStoredLanguage = (): string => localStorage.getItem(STORAGE_KEY.TARGET_LANGUAGE) || 'English';

const readStoredWords = (): WordEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY.WORDS);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(isWordEntry) : [];
  } catch (e) {
    console.error('Failed to parse stored words:', e);
    return [];
  }
};

const readHistory = (): WordEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY.LEARNED_WORDS);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(isWordEntry) : [];
  } catch (e) {
    console.error('Failed to parse history:', e);
    return [];
  }
};

export const useQuiz = (): UseQuizReturn => {
  const [apiKey, setApiKey] = useState<string>(readStoredApiKey);
  const [targetLanguage, setTargetLanguageState] = useState<string>(readStoredLanguage);
  const [step, setStep] = useState<AppStep>(apiKey ? APP_STEP.INPUT : APP_STEP.SETUP);
  const [words, setWords] = useState<WordEntry[]>(readStoredWords);
  const [history, setHistory] = useState<WordEntry[]>(readHistory);
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

  const setTargetLanguage = useCallback((lang: string) => {
    localStorage.setItem(STORAGE_KEY.TARGET_LANGUAGE, lang);
    setTargetLanguageState(lang);
  }, []);

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
        const response = await requestStory(nextWords, category, apiKey, targetLanguage);
        const normalized = normalizeStory(response, nextWords);
        setStory(normalized);
        setQuestions([]);
        setStep(APP_STEP.STORY);

        // Add to history
        const existingHistory = readHistory();
        const updatedHistory = [...nextWords, ...existingHistory].reduce((acc: WordEntry[], curr) => {
          if (!acc.find(item => item.word.toLowerCase() === curr.word.toLowerCase())) {
            acc.push(curr);
          }
          return acc;
        }, []).slice(0, 100);
        
        localStorage.setItem(STORAGE_KEY.LEARNED_WORDS, JSON.stringify(updatedHistory));
        setHistory(updatedHistory);

      } catch (requestError) {
        console.error('Failed to generate story:', requestError);
        setError(getErrorMessage(requestError));
        setStep(APP_STEP.INPUT);
      } finally {
        setLoading(false);
      }
    },
    [apiKey, targetLanguage],
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
      setError(getErrorMessage(requestError));
      setStep(APP_STEP.STORY);
    } finally {
      setLoading(false);
    }
  }, [apiKey, story]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

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
  };
};
