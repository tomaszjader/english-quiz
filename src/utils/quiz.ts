import { EMPTY_WORD, QUIZ_LIMITS } from '../constants/app';
import type { Question, Story, WordEntry } from '../types';

export const createWordEntry = (): WordEntry => ({
  ...EMPTY_WORD,
  id: crypto.randomUUID(),
});

export const sanitizeWords = (words: WordEntry[] = []): WordEntry[] =>
  words
    .map((entry) => ({
      difficulty: (entry.difficulty || EMPTY_WORD.difficulty).toLowerCase(),
      id: entry.id || crypto.randomUUID(),
      translation: entry.translation?.trim() || '',
      word: entry.word?.trim() || '',
    }))
    .filter((entry): entry is WordEntry => Boolean(entry.word));

export const normalizeStory = (story: unknown, fallbackWords: WordEntry[] = []): Story => {
  const storyObj = story as Record<string, unknown> | null;

  const safeTargetWords: string[] =
    Array.isArray(storyObj?.targetWords) && storyObj.targetWords.length
      ? (storyObj.targetWords as string[])
      : fallbackWords.map((entry) => entry.word);

  return {
    content: (storyObj?.content as string)?.trim() || '',
    targetWords: safeTargetWords,
    title: (storyObj?.title as string)?.trim() || 'Your Story',
    wordTranslations: (storyObj?.wordTranslations as Record<string, string>) || {},
  };
};

export const normalizeQuestions = (questionsPayload: unknown): Question[] => {
  const questionsObj = questionsPayload as Record<string, unknown> | unknown[];
  const rawQuestions: unknown[] = Array.isArray(questionsObj)
    ? questionsObj
    : (questionsObj?.questions as unknown[]) || [];

  if (!Array.isArray(rawQuestions)) {
    throw new Error('AI zwrocilo niepoprawny format pytan.');
  }

  const normalized: Question[] = rawQuestions
    .map((question, index): Question | null => {
      const q = question as Record<string, unknown> | null;
      const options = Array.isArray(q?.options) ? (q.options as string[]).slice(0, 4) : [];
      const correctAnswer = typeof q?.correctAnswer === 'number' ? q.correctAnswer : 0;

      return {
        correctAnswer: Number.isInteger(correctAnswer) ? correctAnswer : 0,
        hint: (q?.hint as string)?.trim() || '',
        id: (q?.id as string) || `question-${index + 1}`,
        options,
        question: (q?.question as string)?.trim() || '',
        type: (q?.type as string)?.trim() || 'general',
      };
    })
    .filter((q): q is Question => q !== null && q.question !== '' && q.options.length === 4);

  if (!normalized.length) {
    throw new Error('Nie udalo sie przygotowac pytan do quizu.');
  }

  return normalized.slice(0, QUIZ_LIMITS.QUESTION_COUNT);
};

export const tokenizeStory = (story: string = ''): string[] =>
  story.match(/[\w'-]+|[^\w\s]+|\s+/g) || [];

export const normalizeLookup = (value: string = ''): string =>
  value.toLowerCase().replace(/[^a-z']/g, '');
