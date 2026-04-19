import type { OpenAIRequestParams, OpenAIResponse, Story, Question } from '../types';

const MODEL = 'gpt-4o-mini';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_SYSTEM_PROMPT =
  'You are a helpful English learning assistant. Always answer with valid JSON only.';

const buildErrorMessage = async (response: Response): Promise<string> => {
  let payload: Record<string, unknown> | null = null;

  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    payload = null;
  }

  if (response.status === 401) {
    return 'Nieprawidlowy klucz API OpenAI. Sprawdz ustawienia.';
  }

  if (response.status === 429) {
    return 'Przekroczono limit zapytan. Sprobuj ponownie za chwile.';
  }

  return (payload?.error as Record<string, string>)?.message || 'Nie udalo sie polaczyc z OpenAI.';
};

const parseJsonContent = (content: string | null | undefined): unknown => {
  if (!content) {
    throw new Error('OpenAI nie zwrocilo tresci odpowiedzi.');
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error('OpenAI zwrocilo odpowiedz w niepoprawnym formacie JSON.');
  }
};

const callOpenAI = async ({ apiKey, prompt, systemPrompt = DEFAULT_SYSTEM_PROMPT }: OpenAIRequestParams): Promise<unknown> => {
  if (!apiKey) {
    throw new Error('Brak klucza API OpenAI. Wprowadz go przed generowaniem.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    throw new Error(await buildErrorMessage(response));
  }

  const data = (await response.json()) as OpenAIResponse;
  return parseJsonContent(data?.choices?.[0]?.message?.content);
};

interface WordEntry {
  id: string;
  word: string;
  translation: string;
  difficulty: string;
}

const generateStoryPrompt = (words: WordEntry[], category: string, targetLanguage: string): string => {
  const vocabulary = words
    .map((entry) => `${entry.word}${entry.translation ? ` (${entry.translation})` : ''}`)
    .join(', ');

  return `
Create one short ${targetLanguage} story for vocabulary practice.

Category: ${category}
Target vocabulary: ${vocabulary}

Requirements:
- Story length: 120 to 180 words.
- Use every target word naturally.
- Keep the text clear for an intermediate learner.
- Return Polish translations for the target words.

Return exactly this JSON object:
{
  "title": "Short engaging title (in ${targetLanguage})",
  "content": "Full story text (in ${targetLanguage})",
  "targetWords": ["word1", "word2"],
  "wordTranslations": {
    "word1": "polskie tlumaczenie"
  }
}
  `.trim();
};

const generateQuestionsPrompt = (story: Story): string => `
Create 5 multiple-choice quiz questions based on this English story.

Story title: ${story.title}
Story content: ${story.content}
Key words: ${story.targetWords.join(', ')}

Requirements:
- Mix vocabulary, comprehension, gap-fill and inference questions.
- Each question must have exactly 4 options.
- "correctAnswer" must be the zero-based index of the correct option.
- "hint" must be written in Polish.

Return exactly this JSON object:
{
  "questions": [
    {
      "type": "vocabulary",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "hint": "Polska wskazowka"
    }
  ]
}
`.trim();

export const generateStory = async (words: WordEntry[], category: string, apiKey: string, targetLanguage: string = 'English'): Promise<Story> =>
  callOpenAI({
    apiKey,
    prompt: generateStoryPrompt(words, category, targetLanguage),
    systemPrompt:
      `You are a creative ${targetLanguage} teacher. Write engaging stories and answer with JSON only.`,
  }) as Promise<Story>;

export const generateQuestions = async (story: Story, apiKey: string): Promise<{ questions: Question[] }> =>
  callOpenAI({
    apiKey,
    prompt: generateQuestionsPrompt(story),
    systemPrompt:
      'You are an expert English exam writer. Create fair quiz questions and answer with JSON only.',
  }) as Promise<{ questions: Question[] }>;
