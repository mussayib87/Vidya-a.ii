import { createLessonPrompt } from './prompts/lessonPrompt.js';
import { createExplanationPrompt } from './prompts/explanationPrompt.js';
import { createQuizPrompt } from './prompts/quizPrompt.js';
import { createWorksheetPrompt } from './prompts/worksheetPrompt.js';

export class AiService {
  constructor(config = {}) {
    this.provider = config.provider || process.env.AI_PROVIDER || 'openai';
    this.apiKey = config.apiKey || process.env.AI_API_KEY || '';
    this.model = config.model || process.env.AI_MODEL || 'gpt-4o-mini';
    this.baseUrl = config.baseUrl || process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  }

  /**
   * Helper to clean and parse JSON from model responses
   */
  parseJsonResponse(rawText) {
    if (!rawText) return {};
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    try {
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn('Direct JSON parse failed, attempting regex extract:', err.message);
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI response as valid JSON.');
    }
  }

  /**
   * Universal completion executor using standard Fetch API
   */
  async executePrompt(systemPrompt, userPrompt) {
    if (!this.apiKey) {
      console.warn('⚠️ AI API Key not configured. Using intelligent educational fallback template.');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI Provider API responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '{}';
      return this.parseJsonResponse(content);
    } catch (error) {
      console.error('AI Service Provider Error:', error.message);
      throw error;
    }
  }

  /**
   * Generate a comprehensive structured curriculum lesson
   */
  async generateLesson(params) {
    const { topic, subject, classLevel, board, language } = params;
    const { systemPrompt, userPrompt } = createLessonPrompt(params);

    try {
      const result = await this.executePrompt(systemPrompt, userPrompt);
      if (result) return result;
    } catch (err) {
      console.warn('AI execution returned error, using fallback:', err.message);
    }

    // Fallback template if no API key provided or API unavailable
    return {
      title: `${topic}`,
      englishTitle: topic,
      summary: `Comprehensive conceptual breakdown of ${topic} for Class ${classLevel} ${subject} (${board || 'Karnataka State Board'}).`,
      learningObjectives: [
        `Understand the fundamental definition and properties of ${topic}`,
        `Apply core formulas and theorems to solve standard problems`,
        `Connect ${topic} to practical real-world applications`,
      ],
      sections: [
        {
          heading: `1. Introduction to ${topic}`,
          content: `In Class ${classLevel} ${subject}, **${topic}** forms a foundational pillar. It allows us to analyze relationships, solve algebraic/geometric problems, and model real situations.`,
          keyTakeaways: [`Fundamental concepts of ${topic}`, 'Core terminology and symbols'],
          visualAidDescription: `Illustrative diagram showing key components and stepwise transformation of ${topic}.`,
        },
        {
          heading: `2. Core Theorems & Step-by-Step Logic`,
          content: `To master ${topic}, remember the central principles: break problems into known and unknown variables, apply the governing equations, and verify units.`,
          keyTakeaways: ['Step-by-step problem reduction', 'Unit consistency'],
          visualAidDescription: `Flowchart showing the algorithmic steps for solving ${topic} exam questions.`,
        },
      ],
      realWorldApplication: `${topic} is extensively used in engineering, daily financial calculations, navigation, and architecture.`,
      formulaeOrDefinitions: [
        { term: `${topic} Standard Form`, definition: `Primary mathematical or scientific formulation for ${topic}.` },
      ],
      practiceQuestions: [
        {
          question: `State the primary condition and solve a representative problem for ${topic}.`,
          hint: 'Identify given parameters first and recall the core theorem.',
          solution: 'Substitute values directly into the standard equation and simplify.',
        },
      ],
      commonMisconceptions: [
        `Confusing standard notation with simplified approximations when working with ${topic}.`,
      ],
    };
  }

  /**
   * Generate personalized interactive explanation
   */
  async generateExplanation(params) {
    const { topic, studentQuery, subject, classLevel } = params;
    const { systemPrompt, userPrompt } = createExplanationPrompt(params);

    try {
      const result = await this.executePrompt(systemPrompt, userPrompt);
      if (result) return result;
    } catch (err) {
      console.warn('AI execution returned error, using fallback:', err.message);
    }

    return {
      explanation: `Here is a clear explanation of **${studentQuery || topic}** tailored for Class ${classLevel}: Think of it like building blocks where each piece connects to the next logically.`,
      analogy: `Imagine managing a grocery store inventory: when items are added or removed, you keep track using a balanced ledger—just like equations in ${subject}!`,
      stepByStep: [
        'Step 1: Identify the main problem statement and what you need to find.',
        'Step 2: Apply the governing rule step by step.',
        'Step 3: Check your result to make sure it makes physical and mathematical sense.',
      ],
      quickCheckQuestion: {
        question: `Which of the following is true about ${topic}?`,
        options: [
          'It follows standard conservation and mathematical rules',
          'It changes arbitrarily without rules',
          'It cannot be applied to Class 10 problems',
          'None of the above',
        ],
        correctOption: 'It follows standard conservation and mathematical rules',
        explanation: 'Fundamental laws of science and mathematics maintain consistent rules throughout.',
      },
      followUpSuggestions: [
        `How is ${topic} tested in Karnataka State Board exams?`,
        `Can you show me a solved numerical problem on ${topic}?`,
      ],
    };
  }

  /**
   * Generate interactive multiple choice quiz
   */
  async generateQuiz(params) {
    const { topic, subject, classLevel, language, count = 5, difficulty = 'medium' } = params;
    const { systemPrompt, userPrompt } = createQuizPrompt(params);

    try {
      const result = await this.executePrompt(systemPrompt, userPrompt);
      if (result) return result;
    } catch (err) {
      console.warn('AI execution returned error, using fallback:', err.message);
    }

    const questions = [];
    for (let i = 1; i <= count; i++) {
      questions.push({
        id: i,
        question: `Concept Question ${i}: What is the primary characteristic of ${topic}?`,
        options: [
          `Fundamental property A of ${topic}`,
          `Incorrect alternative B`,
          `Incorrect alternative C`,
          `Incorrect alternative D`,
        ],
        correctAnswer: `Fundamental property A of ${topic}`,
        explanation: `Property A is the exact definition given in Class ${classLevel} ${subject} curriculum.`,
      });
    }

    return {
      title: `${topic} Assessment`,
      subject,
      gradeLevel: String(classLevel),
      language,
      difficulty,
      questions,
    };
  }

  /**
   * Generate practice worksheet
   */
  async generateWorksheet(params) {
    const { topic, subject, classLevel, language, count = 5, difficulty = 'medium' } = params;
    const { systemPrompt, userPrompt } = createWorksheetPrompt(params);

    try {
      const result = await this.executePrompt(systemPrompt, userPrompt);
      if (result) return result;
    } catch (err) {
      console.warn('AI execution returned error, using fallback:', err.message);
    }

    return {
      title: `${topic} Practice Worksheet`,
      topic,
      subject,
      gradeLevel: String(classLevel),
      language,
      worksheet: {
        instructions: `Solve all questions clearly. Show steps where necessary. Target time: ${count * 4} minutes.`,
        shortAnswerQuestions: [
          {
            id: 1,
            question: `Define ${topic} and state its SI unit / mathematical symbol.`,
            marks: 2,
            sampleAnswer: `Definition of ${topic} along with appropriate units.`,
          },
          {
            id: 2,
            question: `State two practical applications of ${topic} in real life.`,
            marks: 2,
            sampleAnswer: `1. Engineering design. 2. Everyday measurements.`,
          },
        ],
        longAnswerQuestions: [
          {
            id: 1,
            question: `Derive or explain the complete formula/theorem for ${topic} with a neat diagram description.`,
            marks: 5,
            solutionSteps: [
              'State the initial hypotheses',
              'Perform algebraic or conceptual derivation',
              'Conclude with the final result',
            ],
          },
        ],
      },
      flashcards: [
        { id: 1, front: `What is ${topic}?`, back: `Core concept definition for Class ${classLevel} ${subject}.` },
        { id: 2, front: `Formula for ${topic}`, back: `Standard curriculum equation and variable meanings.` },
      ],
    };
  }

  /**
   * Generate Flashcard set
   */
  async generateFlashcards(params) {
    const { topic, subject, classLevel, language, count = 6 } = params;
    const worksheetResult = await this.generateWorksheet(params);
    
    if (worksheetResult.flashcards && worksheetResult.flashcards.length >= count) {
      return {
        topic,
        subject,
        gradeLevel: String(classLevel),
        language,
        cards: worksheetResult.flashcards,
      };
    }

    const cards = [];
    for (let i = 1; i <= count; i++) {
      cards.push({
        id: i,
        front: `Key Concept ${i} in ${topic}`,
        back: `Detailed explanation and recall points for concept ${i} in Class ${classLevel} ${subject}.`,
      });
    }

    return {
      topic,
      subject,
      gradeLevel: String(classLevel),
      language,
      cards,
    };
  }
}

export default new AiService();
