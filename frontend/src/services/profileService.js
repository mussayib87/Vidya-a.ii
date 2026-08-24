import api from "../config/api";

export async function getProfile() {
  return api.get("/profile");
}

export async function updateProfile(data) {
  return api.put("/profile", data);
}

export async function saveOnboarding(data) {
  return api.put("/profile/onboarding", data);
}

export async function getDashboard() {
  return api.get("/profile/dashboard");
}

const profileService = {
  getProfile,
  updateProfile,
  saveOnboarding,
  getDashboard,
};

export default profileService;
