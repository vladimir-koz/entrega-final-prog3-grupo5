import { Exercise } from '../models';
import { ExerciseRequestBody } from '../types/exercise.types';
import { AppError } from '../utils/AppError';

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
  const exercises = await Exercise.findAll({
    where: { userId },
    order: [['nombre', 'ASC']]
  });

  return { exercises };
}

export async function getExerciseById(id: number, userId: number) {
  const exercise = await Exercise.findOne({
    where: { id, userId }
  });

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  return { exercise };
}

export async function createExercise(data: ExerciseRequestBody, userId: number) {
  validarDatosExercise(data);

  const exercise = await Exercise.create({
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

  const exercise = await Exercise.findOne({
    where: { id, userId }
  });

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  await exercise.update({
    nombre: data.nombre?.trim() ?? exercise.nombre,
    descripcion: data.descripcion !== undefined ? data.descripcion.trim() || null : exercise.descripcion,
    dificultad: data.dificultad !== undefined ? data.dificultad : exercise.dificultad,
    imagen: data.imagen !== undefined ? data.imagen.trim() || null : exercise.imagen
  });

  return {
    message: 'Ejercicio actualizado exitosamente',
    exercise
  };
}

export async function deleteExercise(id: number, userId: number) {
  const exercise = await Exercise.findOne({
    where: { id, userId }
  });

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  await exercise.destroy();

  return { message: 'Ejercicio eliminado exitosamente' };
}
