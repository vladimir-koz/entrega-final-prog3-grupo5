import { hydrateExerciseLines } from "./exerciseLineUtils";

export const EMPTY_ROUTINE = {
  nombre: "",
  descripcion: "",
  tipo: "",
  grupoMuscularEtiqueta: "",
  dificultad: "",
  tiempoEstimado: "",
};

export function routineToForm(routine) {
  return {
    nombre: routine.nombre,
    descripcion: routine.descripcion || "",
    tipo: routine.tipo || "",
    grupoMuscularEtiqueta: routine.grupoMuscularEtiqueta || "",
    dificultad: routine.dificultad || "",
    tiempoEstimado: routine.tiempoEstimado ?? "",
  };
}

export function routineFormToPayload(form) {
  return {
    ...form,
    tiempoEstimado: form.tiempoEstimado === "" ? null : Number(form.tiempoEstimado),
  };
}

export function routineLinesToForm(lines) {
  return hydrateExerciseLines(lines);
}