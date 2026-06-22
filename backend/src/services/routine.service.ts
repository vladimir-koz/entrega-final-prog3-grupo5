import { RoutineRequestBody } from '../types/routine.types';
import { AppError } from '../utils/AppError';
import {
  createRoutine as createRoutineRepo,
  deleteRoutine as deleteRoutineRepo,
  findRoutineById,
  findRoutines,
  updateRoutine as updateRoutineRepo
} from '../repositories/routine.repository';

function validarDatosRoutine(data: RoutineRequestBody, partial = false): void {
  if (!partial && !data.nombre) {
    throw new AppError('El nombre de la rutina es obligatorio', 400);
  }

  if (data.nombre !== undefined && data.nombre.trim().length < 2) {
    throw new AppError('El nombre de la rutina debe tener al menos 2 caracteres', 400);
  }
}

export async function listRoutines(userId: number) {
  const routines = await findRoutines(userId);

  return { routines };
}

export async function getRoutineById(id: number, userId: number) {
  const routine = await findRoutineById(id, userId);

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  return { routine };
}

export async function createRoutine(data: RoutineRequestBody, userId: number) {
  validarDatosRoutine(data);

  const routine = await createRoutineRepo({
    nombre: data.nombre.trim(),
    descripcion: data.descripcion?.trim() || null,
    tipo: data.tipo?.trim() || null,
    userId,
    grupoMuscularEtiqueta: data.grupoMuscularEtiqueta?.trim() || null,
    dificultad: data.dificultad?.trim() || null,
    tiempoEstimado: data.tiempoEstimado ?? null
  });

  return {
    message: 'Rutina creada exitosamente',
    routine
  };
}

export async function updateRoutine(id: number, data: RoutineRequestBody, userId: number) {
  validarDatosRoutine(data, true);

  const routine = await findRoutineById(id, userId);

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  const updatedRoutine = await updateRoutineRepo(id, {
    nombre: data.nombre?.trim(),
    descripcion: data.descripcion !== undefined ? data.descripcion.trim() || null : undefined,
    tipo: data.tipo !== undefined ? data.tipo.trim() || null : undefined,
    grupoMuscularEtiqueta: data.grupoMuscularEtiqueta !== undefined ? data.grupoMuscularEtiqueta.trim() || null : undefined,
    dificultad: data.dificultad !== undefined ? data.dificultad.trim() || null : undefined,
    tiempoEstimado: data.tiempoEstimado !== undefined ? data.tiempoEstimado : undefined
  }, userId);

  return {
    message: 'Rutina actualizada exitosamente',
    routine: updatedRoutine
  };
}

export async function deleteRoutine(id: number, userId: number) {
  const routine = await findRoutineById(id, userId);

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  await deleteRoutineRepo(id, userId);

  return { message: 'Rutina eliminada exitosamente' };
}
