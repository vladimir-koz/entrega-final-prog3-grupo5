import { RoutineSetRequestBody } from '../types/routineSet.types';
import { AppError } from '../utils/AppError';
import {
  createRoutineSet,
  deleteRoutineSet,
  findRoutineSetById,
  findRoutineSetsByRoutineId,
  updateRoutineSet
} from '../repositories/routineSet.repository';
import { findExerciseById } from '../repositories/exercise.repository';
import { findRoutineById } from '../repositories/routine.repository';

function validarDatosRoutineSet(data: RoutineSetRequestBody, partial = false): void {
  if (!partial) {
    if (!data.routineId) {
      throw new AppError('El routineId es obligatorio', 400);
    }

    if (!data.exerciseId) {
      throw new AppError('El exerciseId es obligatorio', 400);
    }

    if (data.orden === undefined) {
      throw new AppError('El orden es obligatorio', 400);
    }

    if (data.repeticiones === undefined) {
      throw new AppError('Las repeticiones son obligatorias', 400);
    }
  }

  if (data.orden !== undefined && data.orden < 1) {
    throw new AppError('El orden debe ser un numero positivo', 400);
  }

  if (data.repeticiones !== undefined && data.repeticiones < 1) {
    throw new AppError('Las repeticiones deben ser un numero positivo', 400);
  }

  if (data.peso !== undefined && data.peso < 0) {
    throw new AppError('El peso debe ser un numero positivo', 400);
  }
}

async function ensureRoutineVisible(routineId: number, userId: number) {
  const routine = await findRoutineById(routineId, userId);

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  return routine;
}

async function ensureRoutineOwned(routineId: number, userId: number) {
  const routine = await ensureRoutineVisible(routineId, userId);

  if (routine.userId !== userId) {
    throw new AppError('No se puede modificar una rutina global', 403);
  }

  return routine;
}

async function ensureExerciseVisible(exerciseId: number, userId: number) {
  const exercise = await findExerciseById(exerciseId, userId);

  if (!exercise) {
    throw new AppError('Ejercicio no encontrado', 404);
  }

  return exercise;
}

async function ensureRoutineSetVisible(id: number, userId: number) {
  const routineSet = await findRoutineSetById(id);

  if (!routineSet) {
    throw new AppError('Serie de rutina no encontrada', 404);
  }

  await ensureRoutineVisible(routineSet.routineId, userId);

  return routineSet;
}

async function ensureRoutineSetOwned(id: number, userId: number) {
  const routineSet = await findRoutineSetById(id);

  if (!routineSet) {
    throw new AppError('Serie de rutina no encontrada', 404);
  }

  await ensureRoutineOwned(routineSet.routineId, userId);

  return routineSet;
}

export async function listRoutineSets(routineId: number, userId: number) {
  await ensureRoutineVisible(routineId, userId);

  const routineSets = await findRoutineSetsByRoutineId(routineId);

  return { routineSets };
}

export async function getRoutineSetById(id: number, userId: number) {
  const routineSet = await ensureRoutineSetVisible(id, userId);

  return { routineSet };
}

export async function createRoutineSetService(data: RoutineSetRequestBody, userId: number) {
  validarDatosRoutineSet(data);
  await ensureRoutineOwned(data.routineId, userId);
  await ensureExerciseVisible(data.exerciseId, userId);

  const routineSet = await createRoutineSet({
    routineId: data.routineId,
    exerciseId: data.exerciseId,
    orden: data.orden,
    repeticiones: data.repeticiones,
    peso: data.peso ?? null
  });

  return {
    message: 'Serie de rutina creada exitosamente',
    routineSet
  };
}

export async function updateRoutineSetService(id: number, data: RoutineSetRequestBody, userId: number) {
  validarDatosRoutineSet(data, true);
  await ensureRoutineSetOwned(id, userId);

  if (data.routineId !== undefined) {
    await ensureRoutineOwned(data.routineId, userId);
  }

  if (data.exerciseId !== undefined) {
    await ensureExerciseVisible(data.exerciseId, userId);
  }

  const routineSet = await updateRoutineSet(id, {
    routineId: data.routineId,
    exerciseId: data.exerciseId,
    orden: data.orden,
    repeticiones: data.repeticiones,
    peso: data.peso
  });

  if (!routineSet) {
    throw new AppError('Serie de rutina no encontrada', 404);
  }

  return {
    message: 'Serie de rutina actualizada exitosamente',
    routineSet
  };
}

export async function deleteRoutineSetService(id: number, userId: number) {
  await ensureRoutineSetOwned(id, userId);
  await deleteRoutineSet(id);

  return { message: 'Serie de rutina eliminada exitosamente' };
}
