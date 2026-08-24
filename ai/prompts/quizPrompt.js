export const createQuizPrompt = ({
  topic,
  subject,
  classLevel,
  language = 'English',
  count = 5,
  difficulty = 'medium',
}) => {
  const systemPrompt = `You are Vidya AI Assessment Generator. Generate high-quality multiple choice questions (MCQs) for Class ${classLevel} ${subject} in ${language}.
Ensure questions test conceptual understanding, problem-solving, and curriculum standards. Return valid JSON only.`;

  const userPrompt = `Generate a ${count}-question quiz on the topic "${topic}".
- Subject: ${subject}
- Class: Class ${classLevel}
- Language: ${language}
- Difficulty Level: ${difficulty}

Respond ONLY with a JSON object with this exact structure:
{
  "title": "${topic} Quiz",
  "subject": "${subject}",
  "gradeLevel": "${classLevel}",
  "language": "${language}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "Question text in ${language}",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": "Option 1",
      "explanation": "Clear explanation of why this option is correct."
    }
  ]
}`;

  return { systemPrompt, userPrompt };
};
