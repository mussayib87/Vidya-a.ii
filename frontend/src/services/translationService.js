import api from "../config/api";

export async function translate(data) {
  return api.post("/translation", data);
}

export async function getLanguages() {
  return api.get("/translation/languages");
}

const translationService = {
  translate,
  getLanguages,
};

export default translationService;
