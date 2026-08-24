// frontend/src/services/api.js

const DEFAULT_API_URL = "http://localhost:5000/api/v1";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
).replace(/\/+$/, "");

const TOKEN_KEY = "vidya_access_token";

/**
 * Get the configured backend API URL.
 */
export function getApiBaseUrl() {
  return API_BASE_URL;
}

/**
 * Get the stored authentication token.
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Store the authentication token.
 */
export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Remove the authentication token.
 */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Build a complete API URL.
 */
function buildUrl(endpoint) {
  if (!endpoint) {
    return API_BASE_URL;
  }

  // Allow absolute URLs when needed.
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return `${API_BASE_URL}${normalizedEndpoint}`;
}

/**
 * Main API request function.
 */
async function request(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    ...rest
  } = options;

  const token = getToken();

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  // Automatically attach JWT token.
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let requestBody = body;

  // Automatically JSON-encode normal objects.
  // FormData is left untouched so the browser can set
  // the correct multipart/form-data boundary.
  if (
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams)
  ) {
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(endpoint), {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...rest,
  });

  let data = null;

  const contentType =
    response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    const text = await response.text();
    data = text || null;
  }

  // Handle API errors.
  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.errors?.[0]?.message ||
      `Request failed with status ${response.status}`;

    // Token is invalid/expired.
    if (response.status === 401) {
      clearToken();
    }

    const error = new Error(message);

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}

/**
 * API client.
 */
export const api = {
  get(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "GET",
    });
  },

  post(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "POST",
      body,
    });
  },

  put(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PUT",
      body,
    });
  },

  patch(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PATCH",
      body,
    });
  },

  delete(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "DELETE",
      body,
    });
  },
};

export default api;
