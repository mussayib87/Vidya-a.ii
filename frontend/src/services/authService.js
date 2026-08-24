import api, {
  setToken,
  clearToken,
} from "../config/api";

export async function signup(data) {
  const response = await api.post("/auth/signup", data);

  const token =
    response?.token ||
    response?.accessToken ||
    response?.data?.token ||
    response?.data?.accessToken;

  if (token) {
    setToken(token);
  }

  return response;
}

export async function login(data) {
  const response = await api.post("/auth/login", data);

  const token =
    response?.token ||
    response?.accessToken ||
    response?.data?.token ||
    response?.data?.accessToken;

  if (token) {
    setToken(token);
  }

  return response;
}

export async function logout() {
  try {
    return await api.post("/auth/logout");
  } finally {
    clearToken();
  }
}

export async function getMe() {
  return api.get("/auth/me");
}

export async function refreshToken(data) {
  const response = await api.post("/auth/refresh", data);

  const token =
    response?.token ||
    response?.accessToken ||
    response?.data?.token ||
    response?.data?.accessToken;

  if (token) {
    setToken(token);
  }

  return response;
}

export async function forgotPassword(data) {
  return api.post("/auth/forgot-password", data);
}

export async function resetPassword(data) {
  return api.post("/auth/reset-password", data);
}

const authService = {
  signup,
  login,
  logout,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword,
};

export default authService;
