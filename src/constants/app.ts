import type {
  AppStepConstants,
  CategoryOption,
  DifficultyOption,
  QuizLimits,
  StorageKey,
  WordEntry,
} from '../types';

export const APP_STEP: AppStepConstants = {
  GENERATING: 'generating',
  INPUT: 'input',
  QUIZ: 'quiz',
  SETUP: 'setup',
  STORY: 'story',
};

export const STORAGE_KEY: StorageKey = {
  OPENAI_API_KEY: 'openai_api_key',
  WORDS: 'vocabulary_list',
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'general', label: 'Ogolne', description: 'Uniwersalne slownictwo do codziennej nauki.' },
  { value: 'daily', label: 'Codziennosc', description: 'Zwroty przydatne w zwykle sytuacjach.' },
  { value: 'travel', label: 'Podroze', description: 'Slownictwo do lotnisk, hoteli i miasta.' },
  { value: 'business', label: 'Biznes', description: 'Wyrazenia do pracy, spotkan i maili.' },
  { value: 'tech', label: 'Technologia', description: 'Slowa z obszaru produktow, IT i internetu.' },
];

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  { value: 'easy', label: 'Latwe' },
  { value: 'medium', label: 'Srednie' },
  { value: 'hard', label: 'Trudne' },
];

export const QUIZ_LIMITS: QuizLimits = {
  MAX_WORDS: 20,
  MIN_WORDS: 3,
  QUESTION_COUNT: 5,
};

export const EMPTY_WORD: Omit<WordEntry, 'id'> = {
  difficulty: 'medium',
  translation: '',
  word: '',
};
