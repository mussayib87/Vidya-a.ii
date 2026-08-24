import api, {
  setToken,
  clearToken,
} from "../config/api";

function extractToken(response) {
  return (
    response?.data?.session?.accessToken ||
    response?.data?.session?.access_token ||
    response?.data?.accessToken ||
    response?.data?.token ||
    response?.session?.accessToken ||
    response?.session?.access_token ||
    response?.accessToken ||
    response?.token ||
    null
  );
}

export async function signup(data) {
  const response = await api.post("/api/v1/auth/signup", data);
  const token = extractToken(response);

  if (token) {
    setToken(token);
  }

  return response;
}

export async function login(data) {
  const response = await api.post("/api/v1/auth/login", data);
  const token = extractToken(response);

  if (token) {
    setToken(token);
  }

  return response;
}

export async function logout() {
  try {
    return await api.post("/api/v1/auth/logout");
  } finally {
    clearToken();
  }
}

export async function getMe() {
  return api.get("/api/v1/auth/me");
}

export async function refreshToken(data) {
  const response = await api.post(
    "/api/v1/auth/refresh",
    data
  );
  const token = extractToken(response);

  if (token) {
    setToken(token);
  }

  return response;
}

export async function forgotPassword(data) {
  return api.post(
    "/api/v1/auth/forgot-password",
    data
  );
}

export async function resetPassword(data) {
  return api.post(
    "/api/v1/auth/reset-password",
    data
  );
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
