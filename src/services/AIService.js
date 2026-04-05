/**
 * AI Service for Vocabulary Learning
 * Handles real OpenAI API communication using gpt-4o-mini.
 */

const MODEL = "gpt-4o-mini";

export const AIService = {
  /**
   * Helper to call OpenAI API
   */
  callOpenAI: async (prompt, apiKey) => {
    if (!apiKey) throw new Error("Missing API Key");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "You are a helpful language learning assistant. Always respond in valid JSON format. You create engaging stories and quizzes for English learners."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "OpenAI API Error");
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  },

  generateStory: async (words, category = 'general', difficulty = 'medium', apiKey) => {
    const wordList = words.map(w => w.word).join(", ");
    const prompt = `Write a short, engaging story in English for a student at level '${difficulty}'.
    The story should be related to the category '${category}'.
    You MUST use all of these target words naturally: ${wordList}.
    
    Return a JSON object with the following structure:
    {
      "title": "A short engaging title",
      "content": "The story text (5-15 sentences)",
      "targetWords": ["word1", "word2", ...],
      "wordTranslations": {
        "word1": "Polish translation",
        "word2": "Polish translation",
        ...
      }
    }`;

    return await AIService.callOpenAI(prompt, apiKey);
  },

  generateQuestions: async (story, apiKey) => {
    const prompt = `Based on the following story, generate 4 different types of questions to test understanding and vocabulary.
    Story: "${story.content}"
    Target words used: ${story.targetWords.join(", ")}

    Return a JSON array of objects with this exact structure:
    [
      {
        "type": "comprehension", 
        "question": "A question about what happened",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "hint": "A small clue in Polish or English"
      },
      {
        "type": "vocabulary",
        "question": "A question about the meaning of one of the target words",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 1,
        "hint": "A small clue in Polish or English"
      },
      {
        "type": "gap-fill",
        "question": "A sentence from the story with a target word replaced by '____'",
        "options": ["Correct Word", "Distractor 1", "Distractor 2", "Distractor 3"],
        "correctAnswer": 0,
        "hint": "The Polish translation of the missing word"
      },
      {
        "type": "true-false",
        "question": "A statement about the story",
        "options": ["True", "False"],
        "correctAnswer": true,
        "hint": "Think about the ending..."
      }
    ]
    
    The entire response must be a JSON object containing the field 'questions' which is the array.
    `;

    const result = await AIService.callOpenAI(prompt, apiKey);
    return result.questions || result; // Handle both direct array or wrapped object
  }
};
