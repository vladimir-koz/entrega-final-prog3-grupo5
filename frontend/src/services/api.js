const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth:unauthorized"));
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "No se pudo completar la solicitud");
  }

  return data;
}

export { API_BASE_URL };
