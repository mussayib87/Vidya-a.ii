import api from "../config/api";

export async function uploadFile(
  file,
  additionalData = {}
) {
  const formData = new FormData();

  formData.append("file", file);

  Object.entries(additionalData).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null
      ) {
        formData.append(
          key,
          typeof value === "object"
            ? JSON.stringify(value)
            : String(value)
        );
      }
    }
  );

  return api.post(
    "/api/v1/storage/upload",
    formData
  );
}

export async function getSignedUrl(data) {
  return api.post(
    "/api/v1/storage/signed-url",
    data
  );
}

export async function deleteFile(data) {
  return api.delete(
    "/api/v1/storage/file",
    data
  );
}

const storageService = {
  uploadFile,
  getSignedUrl,
  deleteFile,
};

export default storageService;
