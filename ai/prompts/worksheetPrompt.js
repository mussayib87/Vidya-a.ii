export const createWorksheetPrompt = ({
  topic,
  subject,
  classLevel,
  language = 'English',
  count = 5,
  difficulty = 'medium',
}) => {
  const systemPrompt = `You are Vidya AI Worksheet & Flashcard Generator.
Generate structured practice worksheets and flashcards for Indian school students. Return valid JSON only.`;

  const userPrompt = `Generate a comprehensive worksheet and flashcards for:
- Subject: ${subject}
- Class: Class ${classLevel}
- Topic: ${topic}
- Language: ${language}
- Question Count: ${count}
- Difficulty: ${difficulty}

Respond ONLY with a JSON object with this exact structure:
{
  "title": "${topic} Worksheet & Flashcards",
  "topic": "${topic}",
  "subject": "${subject}",
  "gradeLevel": "${classLevel}",
  "language": "${language}",
  "worksheet": {
    "instructions": "General instructions for completing the worksheet",
    "shortAnswerQuestions": [
      {
        "id": 1,
        "question": "Question text",
        "marks": 2,
        "sampleAnswer": "Expected key points in the answer"
      }
    ],
    "longAnswerQuestions": [
      {
        "id": 1,
        "question": "Detailed problem or derivation",
        "marks": 5,
        "solutionSteps": ["Step 1", "Step 2", "Step 3"]
      }
    ]
  },
  "flashcards": [
    {
      "id": 1,
      "front": "Key concept or formula term",
      "back": "Clear concise definition or explanation"
    }
  ]
}`;

  return { systemPrompt, userPrompt };
};
