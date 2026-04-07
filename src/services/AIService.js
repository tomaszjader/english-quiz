/**
 * AI Service for Vocabulary Learning
 * Optimized for gpt-4o-mini with enhanced prompting and error handling.
 */

const MODEL = "gpt-4o-mini";

export const AIService = {
    /**
     * Helper to call OpenAI API with robust error handling
     */
    callOpenAI: async (prompt, apiKey, systemPrompt = "You are a helpful language learning assistant. Always respond in valid JSON format. You create engaging stories and quizzes for English learners.") => {
        if (!apiKey) throw new Error("Brak klucza API OpenAI. Ustaw go w ustawieniach.");

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt }
                    ],
                    response_format: { type: "json_object" },
                    temperature: 0.8, // Slightly higher for more creative stories
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || "Błąd komunikacji z OpenAI.";
                if (response.status === 401) throw new Error("Nieprawidłowy klucz API OpenAI. Sprawdź swoje ustawienia.");
                if (response.status === 429) throw new Error("Przekroczono limit zapytań (Rate limit). Spróbuj ponownie za chwilę.");
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;
            
            try {
                return JSON.parse(content);
            } catch (pErr) {
                console.error("JSON Parse Error:", content);
                throw new Error("Otrzymano nieprawidłowy format danych od AI.");
            }
        } catch (error) {
            console.error("AIService Call Error:", error);
            throw error;
        }
    },

    /**
     * Generates an engaging story using specific vocabulary
     */
    generateStory: async (words, category = 'general', difficulty = 'medium', apiKey) => {
        const wordList = words.map(w => w.word).join(", ");
        const prompt = `Task: Create a captivating short story in English.
        Difficulty Level: ${difficulty} (use appropriate grammar and complexity)
        Context/Category: ${category}
        Target Vocabulary (MANDATORY): ${wordList}
        
        Guidelines:
        - The story must be between 100-200 words.
        - Integrate all target words naturally into the narrative.
        - The story should be coherent, engaging, and educational.
        
        Provide a Polish translation for each target word used.
        
        Return exactly this JSON structure:
        {
          "title": "A creative title",
          "content": "Full story text here...",
          "targetWords": ["word1", "word2", ...],
          "wordTranslations": {
            "word1": "Polish translation",
            "word2": "Polish translation",
            ...
          }
        }`;

        const systemPrompt = "You are a creative writer and English teacher. You write short, immersive stories for students. You must only output JSON.";

        return await AIService.callOpenAI(prompt, apiKey, systemPrompt);
    },

    /**
     * Generates a varied quiz based on the provided story
     */
    generateQuestions: async (story, apiKey) => {
        const prompt = `Based on the following English story, generate 5 high-quality quiz questions.
        Story: "${story.content}"
        Key Vocabulary: ${story.targetWords.join(", ")}

        Requirements for questions:
        1. Mix of types: 
           - 'comprehension': Testing understanding of the plot.
           - 'vocabulary': Testing the meaning of one of the target words.
           - 'gap-fill': Completing a sentence from the story.
           - 'inference': What can be inferred about characters or settings.
        2. Challenging but fair options (plausible distractors).
        3. Provide helpful hints in Polish if a student struggles.

        Return exactly this JSON structure:
        {
          "questions": [
            {
              "type": "vocabulary | comprehension | gap-fill | inference",
              "question": "The question text",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "correctAnswer": 0, (index of the correct option)
              "hint": "Useful clue in Polish"
            }
          ]
        }`;

        const systemPrompt = "You are an expert language examiner. You create challenging and effective multiple-choice questions. You must only output JSON.";

        const result = await AIService.callOpenAI(prompt, apiKey, systemPrompt);
        return result.questions || result; // Fallback for various AI response patterns
    }
};
