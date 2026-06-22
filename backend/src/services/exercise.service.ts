import { ExerciseRequestBody } from '../types/exercise.types';
import { AppError } from '../utils/AppError';
import {
  createExercise as createExerciseRepo,
  deleteExercise as deleteExerciseRepo,
  findExerciseById,
  findExercises,
  updateExercise as updateExerciseRepo
} from '../repositories/exercise.repository';

const dificultadesValidas = ['principiante', 'intermedio', 'avanzado'];

function validarDatosExercise(data: ExerciseRequestBody, partial = false): void {
  if (!partial && !data.nombre) {
    throw new AppError('El nombre del ejercicio es obligatorio', 400);
  }

  if (data.nombre !== undefined && data.nombre.trim().length < 2) {
    throw new AppError('El nombre debe tener al menos 2 caracteres', 400);
  }

  if (data.dificultad && !dificultadesValidas.includes(data.dificultad)) {
    throw new AppError('La dificultad debe ser principiante, intermedio o avanzado', 400);
  }
}

export async function listExercises(userId: number) {
  const exercises = await findExercises(userId);

  return { exercises };
}

export async function getExerciseById(id: number, userId: number) {
  const exercise = await findExerciseById(id, userId);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  return { exercise };
}

export async function createExercise(data: ExerciseRequestBody, userId: number) {
  validarDatosExercise(data);

  const exercise = await createExerciseRepo({
    nombre: data.nombre.trim(),
    descripcion: data.descripcion?.trim() || null,
    userId,
    dificultad: data.dificultad || null,
    imagen: data.imagen?.trim() || null
  });

  return {
    message: 'Ejercicio creado exitosamente',
    exercise
  };
}

export async function updateExercise(id: number, data: ExerciseRequestBody, userId: number) {
  validarDatosExercise(data, true);

  const exercise = await findExerciseById(id, userId);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  const updatedExercise = await updateExerciseRepo(id, {
    nombre: data.nombre?.trim(),
    descripcion: data.descripcion !== undefined ? data.descripcion.trim() || null : undefined,
    dificultad: data.dificultad !== undefined ? data.dificultad : undefined,
    imagen: data.imagen !== undefined ? data.imagen.trim() || null : undefined
  }, userId);

  return {
    message: 'Ejercicio actualizado exitosamente',
    exercise: updatedExercise
  };
}

export async function deleteExercise(id: number, userId: number) {
  const exercise = await findExerciseById(id, userId);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  await deleteExerciseRepo(id, userId);

  return { message: 'Ejercicio eliminado exitosamente' };
}
