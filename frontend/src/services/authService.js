const API_URL = "http://localhost:3001/api/auth";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message);
  }

  return data;
}

export async function register(nombre, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message);
  }

  return data;
}