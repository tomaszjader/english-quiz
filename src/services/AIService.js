const MODEL = 'gpt-4o-mini';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_SYSTEM_PROMPT =
  'You are a helpful English learning assistant. Always answer with valid JSON only.';

const buildErrorMessage = async (response) => {
  let payload;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (response.status === 401) {
    return 'Nieprawidlowy klucz API OpenAI. Sprawdz ustawienia.';
  }

  if (response.status === 429) {
    return 'Przekroczono limit zapytan. Sprobuj ponownie za chwile.';
  }

  return payload?.error?.message || 'Nie udalo sie polaczyc z OpenAI.';
};

const parseJsonContent = (content) => {
  if (!content) {
    throw new Error('OpenAI nie zwrocilo tresci odpowiedzi.');
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error('OpenAI zwrocilo odpowiedz w niepoprawnym formacie JSON.');
  }
};

const callOpenAI = async ({ apiKey, prompt, systemPrompt = DEFAULT_SYSTEM_PROMPT }) => {
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

  const data = await response.json();
  return parseJsonContent(data?.choices?.[0]?.message?.content);
};

const generateStoryPrompt = (words, category) => {
  const vocabulary = words
    .map((entry) => `${entry.word}${entry.translation ? ` (${entry.translation})` : ''}`)
    .join(', ');

  return `
Create one short English story for vocabulary practice.

Category: ${category}
Target vocabulary: ${vocabulary}

Requirements:
- Story length: 120 to 180 words.
- Use every target word naturally.
- Keep the text clear for an intermediate learner.
- Return Polish translations for the target words.

Return exactly this JSON object:
{
  "title": "Short engaging title",
  "content": "Full story text",
  "targetWords": ["word1", "word2"],
  "wordTranslations": {
    "word1": "polskie tlumaczenie"
  }
}
  `.trim();
};

const generateQuestionsPrompt = (story) => `
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

export const generateStory = async (words, category, apiKey) =>
  callOpenAI({
    apiKey,
    prompt: generateStoryPrompt(words, category),
    systemPrompt:
      'You are a creative English teacher. Write engaging stories and answer with JSON only.',
  });

export const generateQuestions = async (story, apiKey) =>
  callOpenAI({
    apiKey,
    prompt: generateQuestionsPrompt(story),
    systemPrompt:
      'You are an expert English exam writer. Create fair quiz questions and answer with JSON only.',
  });
