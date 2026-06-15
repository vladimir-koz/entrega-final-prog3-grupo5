import { Exercise } from '../models';
import { ExerciseRequestBody } from '../types/exercise.types';
import { AppError } from '../utils/AppError';

const dificultadesValidas = ['principiante', 'intermedio', 'avanzado'];

function validarDatosExercise(data: ExerciseRequestBody, partial = false): void {
  if (!partial && (!data.nombre || !data.grupoMuscular)) {
    throw new AppError('Nombre y grupo muscular son obligatorios', 400);
  }

  if (data.nombre !== undefined && data.nombre.trim().length < 2) {
    throw new AppError('El nombre debe tener al menos 2 caracteres', 400);
  }

  if (data.grupoMuscular !== undefined && data.grupoMuscular.trim().length < 2) {
    throw new AppError('El grupo muscular debe tener al menos 2 caracteres', 400);
  }

  if (data.dificultad && !dificultadesValidas.includes(data.dificultad)) {
    throw new AppError('La dificultad debe ser principiante, intermedio o avanzado', 400);
  }
}

export async function listExercises() {
  const exercises = await Exercise.findAll({
    order: [['nombre', 'ASC']]
  });

  return { exercises };
}

export async function getExerciseById(id: number) {
  const exercise = await Exercise.findByPk(id);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  return { exercise };
}

export async function createExercise(data: ExerciseRequestBody) {
  validarDatosExercise(data);

  const exercise = await Exercise.create({
    nombre: data.nombre.trim(),
    descripcion: data.descripcion?.trim() || null,
    grupoMuscular: data.grupoMuscular.trim(),
    equipamiento: data.equipamiento?.trim() || null,
    dificultad: data.dificultad || 'principiante'
  });

  return {
    message: 'Ejercicio creado exitosamente',
    exercise
  };
}

export async function updateExercise(id: number, data: ExerciseRequestBody) {
  validarDatosExercise(data, true);

  const exercise = await Exercise.findByPk(id);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  await exercise.update({
    nombre: data.nombre?.trim() ?? exercise.nombre,
    descripcion: data.descripcion !== undefined ? data.descripcion.trim() || null : exercise.descripcion,
    grupoMuscular: data.grupoMuscular?.trim() ?? exercise.grupoMuscular,
    equipamiento: data.equipamiento !== undefined ? data.equipamiento.trim() || null : exercise.equipamiento,
    dificultad: data.dificultad ?? exercise.dificultad
  });

  return {
    message: 'Ejercicio actualizado exitosamente',
    exercise
  };
}

export async function deleteExercise(id: number) {
  const exercise = await Exercise.findByPk(id);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  await exercise.destroy();

  return { message: 'Ejercicio eliminado exitosamente' };
}
