import { apiRequest } from "./api";

export async function getTrainingPrograms() {
  const data = await apiRequest("/training-programs");
  return data.trainingPrograms;
}

export async function getTrainingProgram(id) {
  const data = await apiRequest(`/training-programs/${id}`);
  return data.trainingProgram;
}

export async function createTrainingProgram(payload) {
  const data = await apiRequest("/training-programs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.trainingProgram;
}

export async function updateTrainingProgram(id, payload) {
  const data = await apiRequest(`/training-programs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.trainingProgram;
}

export function deleteTrainingProgram(id) {
  return apiRequest(`/training-programs/${id}`, { method: "DELETE" });
}

export async function createProgramWeek(payload) {
  const data = await apiRequest("/program-weeks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.programWeek;
}

export async function updateProgramWeek(id, payload) {
  const data = await apiRequest(`/program-weeks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.programWeek;
}

export function deleteProgramWeek(id) {
  return apiRequest(`/program-weeks/${id}`, { method: "DELETE" });
}

export async function createScheduledWorkout(payload) {
  const data = await apiRequest("/scheduled-workouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.scheduledWorkout;
}

export async function updateScheduledWorkout(id, payload) {
  const data = await apiRequest(`/scheduled-workouts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.scheduledWorkout;
}

export function deleteScheduledWorkout(id) {
  return apiRequest(`/scheduled-workouts/${id}`, { method: "DELETE" });
}

export async function getDetailedTrainingPrograms() {
  const programs = await getTrainingPrograms();
  return Promise.all(programs.map((program) => getTrainingProgram(program.id)));
}
