import { countExercisesByIdsForUser } from '../repositories/exercise.repository';
import {
  createWorkoutForUser,
  deleteWorkout,
  findWorkoutByIdForUser,
  findWorkoutsByUser,
  updateWorkoutForUser
} from '../repositories/workout.repository';
import { CreateWorkoutBody, UpdateWorkoutBody, WorkoutSetInput } from '../types/workout.types';
import { AppError } from '../utils/AppError';
import { getUniquePositiveIntegerIds } from '../utils/validateIds';

async function validarEjerciciosDeSeries(
  userId: number,
  series: WorkoutSetInput[] | undefined
): Promise<void> {
  if (series === undefined) {
    return;
  }

  if (!Array.isArray(series)) {
    throw new AppError('series debe ser un arreglo', 400);
  }

  const exerciseIds = getUniquePositiveIntegerIds(
    series.map((serie) => serie.exerciseId),
    'series.exerciseId'
  );

  if (exerciseIds.length === 0) {
    return;
  }

  const existingCount = await countExercisesByIdsForUser(userId, exerciseIds);

  if (existingCount !== exerciseIds.length) {
    throw new AppError('Una o mas series usan ejercicios inexistentes o de otro usuario', 400);
  }
}

export function getWorkouts(userId: number) {
  return findWorkoutsByUser(userId);
}

export async function getWorkout(userId: number, id: number) {
  const workout = await findWorkoutByIdForUser(id, userId);

  if (!workout) {
    throw new AppError('Entrenamiento no encontrado', 404);
  }

  return workout;
}

export async function createWorkoutService(userId: number, data: CreateWorkoutBody) {
  if (!data.nombre) {
    throw new AppError('El nombre del entrenamiento es obligatorio', 400);
  }

  await validarEjerciciosDeSeries(userId, data.series);

  return createWorkoutForUser(userId, data);
}

export async function updateWorkoutService(userId: number, id: number, data: UpdateWorkoutBody) {
  const workout = await getWorkout(userId, id);
  await validarEjerciciosDeSeries(userId, data.series);
  return updateWorkoutForUser(workout, userId, data);
}

export async function deleteWorkoutService(userId: number, id: number) {
  const workout = await getWorkout(userId, id);
  await deleteWorkout(workout);
}
