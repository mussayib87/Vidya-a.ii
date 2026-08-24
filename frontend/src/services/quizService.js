import api from "../config/api";

export async function getQuizzes(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      query.append(key, value);
    }
  });

  const suffix = query.toString()
    ? `?${query.toString()}`
    : "";

  return api.get(
    `/api/v1/quizzes${suffix}`
  );
}

export async function getQuiz(id) {
  return api.get(
    `/api/v1/quizzes/${encodeURIComponent(id)}`
  );
}

export async function createQuiz(data) {
  return api.post(
    "/api/v1/quizzes",
    data
  );
}

export async function updateQuiz(id, data) {
  return api.put(
    `/api/v1/quizzes/${encodeURIComponent(id)}`,
    data
  );
}

export async function deleteQuiz(id) {
  return api.delete(
    `/api/v1/quizzes/${encodeURIComponent(id)}`
  );
}

export async function submitQuizAttempt(
  id,
  data
) {
  return api.post(
    `/api/v1/quizzes/${encodeURIComponent(id)}/attempt`,
    data
  );
}

export async function getMyAttempts() {
  return api.get(
    "/api/v1/quizzes/attempts/my"
  );
}

export async function getQuizAttempts(id) {
  return api.get(
    `/api/v1/quizzes/${encodeURIComponent(id)}/attempts`
  );
}

const quizService = {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getMyAttempts,
  getQuizAttempts,
};

export default quizService;
