import { MuscleGroupRequestBody } from '../types/muscleGroup.types';
import { AppError } from '../utils/AppError';
import {
  createMuscleGroup as createMuscleGroupRepo,
  deleteMuscleGroup as deleteMuscleGroupRepo,
  findMuscleGroupById,
  findMuscleGroups,
  updateMuscleGroup as updateMuscleGroupRepo
} from '../repositories/muscleGroup.repository';

function validateMuscleGroupData(data: MuscleGroupRequestBody, partial = false): void {
  if (!partial && !data.nombre) {
    throw new AppError('Muscle group name is required', 400);
  }

  if (data.nombre !== undefined && data.nombre.trim().length < 2) {
    throw new AppError('Muscle group name must have at least 2 characters', 400);
  }
}

export async function listMuscleGroups(userId: number) {
  const muscleGroups = await findMuscleGroups(userId);

  return { muscleGroups };
}

export async function getMuscleGroupById(id: number, userId: number) {
  const muscleGroup = await findMuscleGroupById(id, userId);

  if (!muscleGroup) {
    throw new AppError('Muscle group not found', 404);
  }

  return { muscleGroup };
}

export async function createMuscleGroup(data: MuscleGroupRequestBody, userId: number) {
  validateMuscleGroupData(data);

  const muscleGroup = await createMuscleGroupRepo({
    nombre: data.nombre.trim(),
    userId
  });

  return {
    message: 'Muscle group created successfully',
    muscleGroup
  };
}

export async function updateMuscleGroup(id: number, data: MuscleGroupRequestBody, userId: number) {
  validateMuscleGroupData(data, true);

  const muscleGroup = await findMuscleGroupById(id, userId);

  if (!muscleGroup) {
    throw new AppError('Muscle group not found', 404);
  }

  if (muscleGroup.userId !== userId) {
    throw new AppError('Global muscle groups cannot be modified', 403);
  }

  const updatedMuscleGroup = await updateMuscleGroupRepo(id, {
    nombre: data.nombre?.trim()
  }, userId);

  return {
    message: 'Muscle group updated successfully',
    muscleGroup: updatedMuscleGroup
  };
}

export async function deleteMuscleGroup(id: number, userId: number) {
  const muscleGroup = await findMuscleGroupById(id, userId);

  if (!muscleGroup) {
    throw new AppError('Muscle group not found', 404);
  }

  if (muscleGroup.userId !== userId) {
    throw new AppError('Global muscle groups cannot be deleted', 403);
  }

  await deleteMuscleGroupRepo(id, userId);

  return { message: 'Muscle group deleted successfully' };
}
