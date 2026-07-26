import { apiRequest } from "./api";

export async function getExercises() {
  const data = await apiRequest("/exercises");
  return data.exercises;
}

export async function createExercise(payload) {
  const data = await apiRequest("/exercises", { method: "POST", body: JSON.stringify(payload) });
  return data.exercise;
}

export async function updateExercise(id, payload) {
  const data = await apiRequest(`/exercises/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  return data.exercise;
}

export async function deleteExercise(id) {
  return apiRequest(`/exercises/${id}`, { method: "DELETE" });
}

export async function getMuscleGroups() {
  const data = await apiRequest("/muscle-groups");
  return data.muscleGroups;
}