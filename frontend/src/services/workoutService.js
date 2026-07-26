import { apiRequest } from "./api";

export async function getWorkouts() {
  const data = await apiRequest("/workouts");
  return data.workouts;
}

export async function createWorkout(payload) {
  const data = await apiRequest("/workouts", { method: "POST", body: JSON.stringify(payload) });
  return data.workout;
}

export async function deleteWorkout(id) {
  return apiRequest(`/workouts/${id}`, { method: "DELETE" });
}