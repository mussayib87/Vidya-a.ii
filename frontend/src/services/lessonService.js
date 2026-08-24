import api from "../config/api";

export async function getLessons(params = {}) {
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
    `/api/v1/lessons${suffix}`
  );
}

export async function getLesson(id) {
  return api.get(
    `/api/v1/lessons/${encodeURIComponent(id)}`
  );
}

export async function createLesson(data) {
  return api.post(
    "/api/v1/lessons",
    data
  );
}

export async function updateLesson(id, data) {
  return api.put(
    `/api/v1/lessons/${encodeURIComponent(id)}`,
    data
  );
}

export async function deleteLesson(id) {
  return api.delete(
    `/api/v1/lessons/${encodeURIComponent(id)}`
  );
}

export async function publishLesson(id) {
  return api.post(
    `/api/v1/lessons/${encodeURIComponent(id)}/publish`
  );
}

export async function updateProgress(id, data) {
  return api.post(
    `/api/v1/lessons/${encodeURIComponent(id)}/progress`,
    data
  );
}

export async function getProgress(id) {
  return api.get(
    `/api/v1/lessons/${encodeURIComponent(id)}/progress`
  );
}

const lessonService = {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  publishLesson,
  updateProgress,
  getProgress,
};

export default lessonService;
