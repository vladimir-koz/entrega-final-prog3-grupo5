import { apiRequest } from "./api";

export async function getRoutines() {
  const data = await apiRequest("/workout-templates");
  return data.workoutTemplates;
}

export async function createRoutine(payload) {
  const data = await apiRequest("/workout-templates", { method: "POST", body: JSON.stringify(payload) });
  return data.workoutTemplate;
}

export async function updateRoutine(id, payload) {
  const data = await apiRequest(`/workout-templates/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return data.workoutTemplate;
}

export async function deleteRoutine(id) {
  return apiRequest(`/workout-templates/${id}`, { method: "DELETE" });
}

export async function getRoutineExercises(routineId) {
  const data = await apiRequest(`/workout-template-exercises?workoutTemplateId=${routineId}`);
  return data.workoutTemplateExercises;
}

export async function addRoutineExercise(payload) {
  const data = await apiRequest("/workout-template-exercises", { method: "POST", body: JSON.stringify(payload) });
  return data.workoutTemplateExercise;
}

export async function deleteRoutineExercise(id) {
  return apiRequest(`/workout-template-exercises/${id}`, { method: "DELETE" });
}