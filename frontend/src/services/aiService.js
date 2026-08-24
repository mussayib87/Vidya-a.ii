import api from "../config/api";

export async function generateLesson(data) {
  return api.post(
    "/api/v1/ai/lesson",
    data
  );
}

export async function generateExplanation(data) {
  return api.post(
    "/api/v1/ai/explanation",
    data
  );
}

export async function generateQuiz(data) {
  return api.post(
    "/api/v1/ai/quiz",
    data
  );
}

export async function generateWorksheet(data) {
  return api.post(
    "/api/v1/ai/worksheet",
    data
  );
}

export async function generateFlashcards(data) {
  return api.post(
    "/api/v1/ai/flashcards",
    data
  );
}

const aiService = {
  generateLesson,
  generateExplanation,
  generateQuiz,
  generateWorksheet,
  generateFlashcards,
};

export default aiService;
