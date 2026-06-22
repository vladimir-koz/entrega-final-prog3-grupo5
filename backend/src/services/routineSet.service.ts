import { RoutineSetRequestBody } from '../types/routineSet.types';
import { AppError } from '../utils/AppError';
import {
  createRoutineSet,
  deleteRoutineSet,
  findRoutineSetById,
  findRoutineSetsByRoutineId,
  updateRoutineSet
} from '../repositories/routineSet.repository';

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

  if (data.orden !== undefined && data.orden < 0) {
    throw new AppError('El orden debe ser un numero positivo', 400);
  }

  if (data.repeticiones !== undefined && data.repeticiones < 0) {
    throw new AppError('Las repeticiones deben ser un numero positivo', 400);
  }

  if (data.peso !== undefined && data.peso < 0) {
    throw new AppError('El peso debe ser un numero positivo', 400);
  }
}

export async function listRoutineSets(routineId: number) {
  const routineSets = await findRoutineSetsByRoutineId(routineId);

  return { routineSets };
}

export async function getRoutineSetById(id: number) {
  const routineSet = await findRoutineSetById(id);

  if (!routineSet) {
    throw new AppError('Routine set no encontrado', 404);
  }

  return { routineSet };
}

export async function createRoutineSetService(data: RoutineSetRequestBody) {
  validarDatosRoutineSet(data);

  const routineSet = await createRoutineSet({
    routineId: data.routineId,
    exerciseId: data.exerciseId,
    orden: data.orden,
    repeticiones: data.repeticiones,
    peso: data.peso ?? null
  });

  return {
    message: 'Routine set creado exitosamente',
    routineSet
  };
}

export async function updateRoutineSetService(id: number, data: RoutineSetRequestBody) {
  validarDatosRoutineSet(data, true);

  const routineSet = await updateRoutineSet(id, {
    routineId: data.routineId,
    exerciseId: data.exerciseId,
    orden: data.orden,
    repeticiones: data.repeticiones,
    peso: data.peso
  });

  if (!routineSet) {
    throw new AppError('Routine set no encontrado', 404);
  }

  return {
    message: 'Routine set actualizado exitosamente',
    routineSet
  };
}

export async function deleteRoutineSetService(id: number) {
  const routineSet = await deleteRoutineSet(id);

  if (!routineSet) {
    throw new AppError('Routine set no encontrado', 404);
  }

  return { message: 'Routine set eliminado exitosamente' };
}
