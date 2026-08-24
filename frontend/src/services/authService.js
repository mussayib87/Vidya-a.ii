import api, {
  setToken,
  clearToken,
} from "../config/api";

/**
 * Extracts the JWT access token from whatever shape the backend response
 * carries it in.  Supabase wraps it in `session.accessToken`; simpler
 * backends may hoist it to the top level.
 */
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
  const response = await api.post("/auth/signup", data);
  const token = extractToken(response);

  if (token) {
    setToken(token);
  }

  return response;
}

export async function login(data) {
  const response = await api.post("/auth/login", data);
  const token = extractToken(response);

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
  const token = extractToken(response);

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
