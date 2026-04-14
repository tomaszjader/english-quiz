export const APP_STEP = {
  GENERATING: 'generating',
  INPUT: 'input',
  QUIZ: 'quiz',
  SETUP: 'setup',
  STORY: 'story',
};

export const STORAGE_KEY = {
  OPENAI_API_KEY: 'openai_api_key',
};

export const CATEGORY_OPTIONS = [
  { value: 'general', label: 'Ogolne', description: 'Uniwersalne slownictwo do codziennej nauki.' },
  { value: 'daily', label: 'Codziennosc', description: 'Zwroty przydatne w zwyklych sytuacjach.' },
  { value: 'travel', label: 'Podroze', description: 'Slownictwo do lotnisk, hotelu i miasta.' },
  { value: 'business', label: 'Biznes', description: 'Wyrazenia do pracy, spotkan i maili.' },
  { value: 'tech', label: 'Technologia', description: 'Slowa z obszaru produktow, IT i internetu.' },
];

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Latwe' },
  { value: 'medium', label: 'Srednie' },
  { value: 'hard', label: 'Trudne' },
];

export const QUIZ_LIMITS = {
  MAX_WORDS: 20,
  MIN_WORDS: 3,
  QUESTION_COUNT: 5,
};

export const EMPTY_WORD = {
  difficulty: 'medium',
  translation: '',
  word: '',
};
