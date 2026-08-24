import api from "../config/api";

export async function translate(data) {
  return api.post(
    "/api/v1/translation",
    data
  );
}

export async function getLanguages() {
  return api.get(
    "/api/v1/translation/languages"
  );
}

const translationService = {
  translate,
  getLanguages,
};

export default translationService;
