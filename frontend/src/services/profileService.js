import { apiRequest } from "./api";

export async function getProfile() {
  const data = await apiRequest("/auth/perfil");
  return data.user;
}
