export const EMPTY_EXERCISE = {
  nombre: "",
  descripcion: "",
  dificultad: "principiante",
  imagen: "",
  muscleGroupIds: [],
};

export function exerciseToForm(exercise) {
  return {
    nombre: exercise.nombre,
    descripcion: exercise.descripcion || "",
    dificultad: exercise.dificultad || "principiante",
    imagen: exercise.imagen || "",
    muscleGroupIds: (exercise.muscleGroups || []).map((group) => group.id),
  };
}

export function filterExercises(exercises, search, difficulty) {
  const normalizedSearch = search.trim().toLowerCase();

  return exercises.filter((exercise) => {
    const termMatch = exercise.nombre.toLowerCase().includes(normalizedSearch)
      || (exercise.descripcion || "").toLowerCase().includes(normalizedSearch);
    return termMatch && (!difficulty || exercise.dificultad === difficulty);
  });
}