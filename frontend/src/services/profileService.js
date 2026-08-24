import api from "../config/api";

export async function getProfile() {
  return api.get("/api/v1/profile");
}

export async function updateProfile(data) {
  return api.put("/api/v1/profile", data);
}

export async function saveOnboarding(data) {
  return api.put(
    "/api/v1/profile/onboarding",
    data
  );
}

export async function getDashboard() {
  return api.get("/api/v1/profile/dashboard");
}

const profileService = {
  getProfile,
  updateProfile,
  saveOnboarding,
  getDashboard,
};

export default profileService;
