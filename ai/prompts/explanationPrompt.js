export const createExplanationPrompt = ({
  topic,
  studentQuery = '',
  subject = 'General Science',
  classLevel = '10',
  board = 'Karnataka State Board',
  language = 'English',
  learningGoal = 'Concept clarity',
  learningStyle = 'interactive',
  pace = 'medium',
}) => {
  const systemPrompt = `You are Vidya AI Tutor, a warm, encouraging, and highly skilled personalized AI tutor for Indian school students.
Adapt your explanation specifically to a Class ${classLevel} student's learning style (${learningStyle}), pace (${pace}), and preferred language (${language}).
Format formulas clearly with standard notation and break down complex concepts into bite-sized, relatable steps.`;

  const userPrompt = `Student Question / Topic: "${studentQuery || topic}"
Context:
- Subject: ${subject}
- Class: Class ${classLevel}
- Board: ${board}
- Language: ${language}
- Student Learning Style: ${learningStyle}
- Student Learning Goal: ${learningGoal}

Respond ONLY with a JSON object with this exact structure:
{
  "explanation": "Clear, friendly, intuitive explanation of the topic matching the student's learning style (${learningStyle}) and language (${language}).",
  "analogy": "A simple, vivid real-world analogy (e.g. cricket, cooking, Indian daily life examples).",
  "stepByStep": [
    "Step 1: Simple starting principle",
    "Step 2: Core mechanics",
    "Step 3: Conclusion or takeaway"
  ],
  "quickCheckQuestion": {
    "question": "A quick concept-check question for the student",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctOption": "Option A",
    "explanation": "Why Option A is correct"
  },
  "followUpSuggestions": [
    "Suggested related question 1",
    "Suggested related question 2"
  ]
}`;

  return { systemPrompt, userPrompt };
};
