import { Op } from 'sequelize';
import { Exercise } from '../models';
import { ExerciseDifficulty } from '../models/Exercise';

export interface ExerciseCreateData {
  nombre: string;
  descripcion?: string | null;
  dificultad?: ExerciseDifficulty | null;
  imagen?: string | null;
  userId?: number | null;
}

export async function findExercises(userId: number) {
  return Exercise.findAll({
    where: {
      [Op.or]: [{ userId: null }, { userId }]
    },
    order: [['nombre', 'ASC']]
  });
}

export async function findExerciseById(id: number, userId: number) {
  return Exercise.findOne({
    where: {
      id,
      [Op.or]: [{ userId: null }, { userId }]
    }
  });
}

export async function createExercise(data: ExerciseCreateData) {
  return Exercise.create(data);
}

export async function updateExercise(id: number, data: Partial<ExerciseCreateData>, userId: number) {
  const exercise = await Exercise.findByPk(id);

  if (!exercise || exercise.userId !== userId) {
    return null;
  }

  return exercise.update(data);
}

export async function deleteExercise(id: number, userId: number) {
  const exercise = await Exercise.findByPk(id);

  if (!exercise || exercise.userId !== userId) {
    return null;
  }

  await exercise.destroy();
  return exercise;
}
