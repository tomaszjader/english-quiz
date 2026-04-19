export type AppStep = 'generating' | 'input' | 'quiz' | 'setup' | 'story';

export interface WordEntry {
  id: string;
  word: string;
  translation: string;
  difficulty: string;
}

export interface Story {
  title: string;
  content: string;
  targetWords: string[];
  wordTranslations: Record<string, string>;
}

export interface Question {
  id: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface CategoryOption {
  value: string;
  label: string;
  description: string;
}

export interface DifficultyOption {
  value: string;
  label: string;
}

export interface QuizLimits {
  MAX_WORDS: number;
  MIN_WORDS: number;
  QUESTION_COUNT: number;
}

export interface StorageKey {
  OPENAI_API_KEY: string;
  WORDS: string;
  LEARNED_WORDS: string;
  TARGET_LANGUAGE: string;
}

export interface AppStepConstants {
  GENERATING: 'generating';
  INPUT: 'input';
  QUIZ: 'quiz';
  SETUP: 'setup';
  STORY: 'story';
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface OpenAIRequestParams {
  apiKey: string;
  prompt: string;
  systemPrompt?: string;
}

export interface UseQuizReturn {
  apiKey: string;
  error: string;
  loading: boolean;
  questions: Question[];
  step: AppStep;
  story: Story | null;
  words: WordEntry[];
  targetLanguage: string;
  history: WordEntry[];
  generateStory: (words: WordEntry[], category: string) => Promise<void>;
  handleClearKey: () => void;
  handleSaveKey: (key: string) => void;
  restart: () => void;
  saveWords: (words: WordEntry[]) => void;
  startQuiz: () => Promise<void>;
  setTargetLanguage: (lang: string) => void;
  setStep: (step: AppStep) => void;
}
