export function filterExercisesByMuscleGroup(exercises, groupId) {
  if (!groupId) return exercises;
  return exercises.filter((exercise) => exercise.muscleGroups?.some((group) => group.id === Number(groupId)));
}

export function buildProgressChartData(progress) {
  return {
    labels: progress.map((entry) => new Date(entry.date).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })),
    datasets: [
      { label: "Peso máximo (kg)", data: progress.map((entry) => entry.maxWeight), borderColor: "#ef233c", backgroundColor: "rgba(239,35,60,.16)", fill: true, tension: 0.25 },
      { label: "1RM estimado", data: progress.map((entry) => entry.estimatedOneRepMax), borderColor: "#58c887", backgroundColor: "transparent", tension: 0.25 },
    ],
  };
}

export function buildActivityChartData(activity) {
  return {
    labels: activity.map((entry) => new Date(`${entry.date}T12:00:00`).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })),
    datasets: [{ label: "Volumen (kg)", data: activity.map((entry) => entry.totalVolume), backgroundColor: "#e01e37", borderRadius: 3 }],
  };
}