import { apiRequest } from "./api";

function queryString(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== "" && value != null),
  );
  return query.toString() ? `?${query}` : "";
}

export async function getSummary(params = {}) {
  const data = await apiRequest(`/metrics/summary${queryString(params)}`);
  return data.summary;
}

export async function getActivity(params = {}) {
  const data = await apiRequest(`/metrics/activity-heatmap${queryString(params)}`);
  return data.activity;
}

export async function getExerciseProgress(exerciseId, params = {}) {
  return apiRequest(`/metrics/exercise-progress${queryString({ exerciseId, ...params })}`);
}
