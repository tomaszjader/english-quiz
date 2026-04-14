import { EMPTY_WORD, QUIZ_LIMITS } from '../constants/app';

export const createWordEntry = () => ({
  ...EMPTY_WORD,
  id: crypto.randomUUID(),
});

export const sanitizeWords = (words = []) =>
  words
    .map((entry) => ({
      difficulty: (entry.difficulty || EMPTY_WORD.difficulty).toLowerCase(),
      id: entry.id || crypto.randomUUID(),
      translation: entry.translation?.trim() || '',
      word: entry.word?.trim() || '',
    }))
    .filter((entry) => entry.word);

export const normalizeStory = (story, fallbackWords = []) => {
  const safeTargetWords = Array.isArray(story?.targetWords) && story.targetWords.length
    ? story.targetWords
    : fallbackWords.map((entry) => entry.word);

  return {
    content: story?.content?.trim() || '',
    targetWords: safeTargetWords,
    title: story?.title?.trim() || 'Your Story',
    wordTranslations: story?.wordTranslations || {},
  };
};

export const normalizeQuestions = (questionsPayload) => {
  const rawQuestions = Array.isArray(questionsPayload)
    ? questionsPayload
    : questionsPayload?.questions;

  if (!Array.isArray(rawQuestions)) {
    throw new Error('AI zwrocilo niepoprawny format pytan.');
  }

  const normalized = rawQuestions
    .map((question, index) => ({
      correctAnswer: Number.isInteger(question?.correctAnswer) ? question.correctAnswer : 0,
      hint: question?.hint?.trim() || '',
      id: question?.id || `question-${index + 1}`,
      options: Array.isArray(question?.options) ? question.options.slice(0, 4) : [],
      question: question?.question?.trim() || '',
      type: question?.type?.trim() || 'general',
    }))
    .filter((question) => question.question && question.options.length === 4);

  if (!normalized.length) {
    throw new Error('Nie udalo sie przygotowac pytan do quizu.');
  }

  return normalized.slice(0, QUIZ_LIMITS.QUESTION_COUNT);
};

export const tokenizeStory = (story = '') =>
  story.match(/[\w'-]+|[^\w\s]+|\s+/g) || [];

export const normalizeLookup = (value = '') =>
  value.toLowerCase().replace(/[^a-z']/g, '');
