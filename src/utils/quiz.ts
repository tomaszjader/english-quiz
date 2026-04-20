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
  if (typeof story !== 'object' || story === null) {
    return { content: '', targetWords: fallbackWords.map((e) => e.word), title: 'Your Story', wordTranslations: {} };
  }

  const storyObj = story as Record<string, unknown>;

  const safeTargetWords: string[] = Array.isArray(storyObj.targetWords) && storyObj.targetWords.every(w => typeof w === 'string')
    ? storyObj.targetWords
    : fallbackWords.map((entry) => entry.word);

  const wordTranslations = typeof storyObj.wordTranslations === 'object' && storyObj.wordTranslations !== null
    ? (storyObj.wordTranslations as Record<string, string>)
    : {};

  return {
    content: typeof storyObj.content === 'string' ? storyObj.content.trim() : '',
    targetWords: safeTargetWords,
    title: typeof storyObj.title === 'string' ? storyObj.title.trim() : 'Your Story',
    wordTranslations,
  };
};

export const normalizeQuestions = (questionsPayload: unknown): Question[] => {
  let rawQuestions: unknown[] = [];

  if (Array.isArray(questionsPayload)) {
    rawQuestions = questionsPayload;
  } else if (typeof questionsPayload === 'object' && questionsPayload !== null) {
    const obj = questionsPayload as Record<string, unknown>;
    if (Array.isArray(obj.questions)) {
      rawQuestions = obj.questions;
    }
  }

  if (!Array.isArray(rawQuestions)) {
    throw new Error('AI zwrocilo niepoprawny format pytan.');
  }

  const normalized: Question[] = rawQuestions
    .map((question, index): Question | null => {
      if (typeof question !== 'object' || question === null) return null;

      const q = question as Record<string, unknown>;
      const options = Array.isArray(q.options)
        ? q.options.filter((opt): opt is string => typeof opt === 'string').slice(0, 4)
        : [];
      const correctAnswer = typeof q.correctAnswer === 'number' && Number.isInteger(q.correctAnswer)
        ? q.correctAnswer
        : 0;
      const hint = typeof q.hint === 'string' ? q.hint.trim() : '';
      const id = typeof q.id === 'string' ? q.id : `question-${index + 1}`;
      const questionText = typeof q.question === 'string' ? q.question.trim() : '';
      const type = typeof q.type === 'string' ? q.type.trim() : 'general';

      if (!questionText || options.length !== 4) return null;

      return {
        correctAnswer,
        hint,
        id,
        options,
        question: questionText,
        type,
      };
    })
    .filter((q): q is Question => q !== null);

  if (!normalized.length) {
    throw new Error('Nie udalo sie przygotowac pytan do quizu.');
  }

  return normalized.slice(0, QUIZ_LIMITS.QUESTION_COUNT);
};

export const tokenizeStory = (story: string = ''): string[] =>
  story.match(/[\w'-]+|[^\w\s]+|\s+/g) || [];

export const normalizeLookup = (value: string = ''): string =>
  value.toLowerCase().replace(/[^a-z']/g, '');
