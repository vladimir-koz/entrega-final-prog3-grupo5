import { createContext, useEffect, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../services/authService";

export const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function saveSession(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  async function login(email, password) {
    const data = await loginRequest(email, password);
    saveSession(data);
  }

  async function register(nombre, email, password) {
    const data = await registerRequest(nombre, email, password);
    saveSession(data);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    window.addEventListener("auth:unauthorized", logout);
    return () => window.removeEventListener("auth:unauthorized", logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(token), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

