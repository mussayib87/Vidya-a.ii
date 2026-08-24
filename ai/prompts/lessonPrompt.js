export const createLessonPrompt = ({
  topic,
  subject,
  classLevel,
  board = 'Karnataka State Board',
  language = 'English',
  learningGoal = 'Master fundamental concepts and solve board exam problems',
  learningStyle = 'visual',
  pace = 'medium',
}) => {
  const systemPrompt = `You are Vidya AI, an expert pedagogic teacher and curriculum designer specialized in K-12 education, specifically for ${board} and Indian state and national syllabi.
Your task is to generate a comprehensive, engaging, structured lesson strictly tailored to Class ${classLevel} students in ${language}.
Always return your response as a valid JSON object matching the requested schema.`;

  const userPrompt = `Generate an in-depth lesson for:
- Subject: ${subject}
- Class / Grade: Class ${classLevel}
- Board: ${board}
- Topic: ${topic}
- Language: ${language}
- Student Learning Goal: ${learningGoal}
- Student Learning Style: ${learningStyle}
- Preferred Pace: ${pace}

Respond ONLY with a JSON object with this exact structure:
{
  "title": "Lesson title in ${language}",
  "englishTitle": "Lesson title in English",
  "summary": "Brief 2-sentence summary of the lesson",
  "learningObjectives": [
    "Objective 1",
    "Objective 2",
    "Objective 3"
  ],
  "sections": [
    {
      "heading": "Section Heading",
      "content": "Detailed explanation using simple analogies, definitions, and step-by-step logic formatted in clean markdown.",
      "keyTakeaways": ["Key point 1", "Key point 2"],
      "visualAidDescription": "Description of a diagram or illustration that aids visual understanding."
    }
  ],
  "realWorldApplication": "How this concept applies to daily life in India / real world.",
  "formulaeOrDefinitions": [
    { "term": "Term or Formula name", "definition": "Clear concise formula or definition" }
  ],
  "practiceQuestions": [
    {
      "question": "Practice question 1",
      "hint": "Hint to solve",
      "solution": "Step by step solution"
    }
  ],
  "commonMisconceptions": [
    "Common mistake students make and how to avoid it"
  ]
}`;

  return { systemPrompt, userPrompt };
};
