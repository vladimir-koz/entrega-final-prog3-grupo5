import { Routine } from '../models';
import { RoutineRequestBody } from '../types/routine.types';
import { AppError } from '../utils/AppError';

function validarDatosRoutine(data: RoutineRequestBody, partial = false): void {
  if (!partial && !data.nombre) {
    throw new AppError('El nombre de la rutina es obligatorio', 400);
  }

  if (data.nombre !== undefined && data.nombre.trim().length < 2) {
    throw new AppError('El nombre de la rutina debe tener al menos 2 caracteres', 400);
  }
}

export async function listRoutines(userId: number) {
  const routines = await Routine.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });

  return { routines };
}

export async function getRoutineById(id: number, userId: number) {
  const routine = await Routine.findOne({
    where: { id, userId }
  });

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  return { routine };
}

export async function createRoutine(data: RoutineRequestBody, userId: number) {
  validarDatosRoutine(data);

  const routine = await Routine.create({
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

  const routine = await Routine.findOne({
    where: { id, userId }
  });

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  await routine.update({
    nombre: data.nombre?.trim() ?? routine.nombre,
    descripcion: data.descripcion !== undefined ? data.descripcion.trim() || null : routine.descripcion,
    tipo: data.tipo !== undefined ? data.tipo.trim() || null : routine.tipo,
    grupoMuscularEtiqueta: data.grupoMuscularEtiqueta !== undefined ? data.grupoMuscularEtiqueta.trim() || null : routine.grupoMuscularEtiqueta,
    dificultad: data.dificultad !== undefined ? data.dificultad.trim() || null : routine.dificultad,
    tiempoEstimado: data.tiempoEstimado !== undefined ? data.tiempoEstimado : routine.tiempoEstimado
  });

  return {
    message: 'Rutina actualizada exitosamente',
    routine
  };
}

export async function deleteRoutine(id: number, userId: number) {
  const routine = await Routine.findOne({
    where: { id, userId }
  });

  if (!routine) {
    throw new AppError('Rutina no encontrada', 404);
  }

  await routine.destroy();

  return { message: 'Rutina eliminada exitosamente' };
}
