import { Op } from 'sequelize';
import { Routine } from '../models';

export interface RoutineCreateData {
  nombre: string;
  descripcion?: string | null;
  tipo?: string | null;
  grupoMuscularEtiqueta?: string | null;
  dificultad?: string | null;
  tiempoEstimado?: number | null;
  userId?: number | null;
}

export async function findRoutines(userId: number) {
  return Routine.findAll({
    where: {
      [Op.or]: [{ userId: null }, { userId }]
    },
    order: [['createdAt', 'DESC']]
  });
}

export async function findRoutineById(id: number, userId: number) {
  return Routine.findOne({
    where: {
      id,
      [Op.or]: [{ userId: null }, { userId }]
    }
  });
}

export async function createRoutine(data: RoutineCreateData) {
  return Routine.create(data);
}

export async function updateRoutine(id: number, data: Partial<RoutineCreateData>, userId: number) {
  const routine = await Routine.findByPk(id);

  if (!routine || routine.userId !== userId) {
    return null;
  }

  return routine.update(data);
}

export async function deleteRoutine(id: number, userId: number) {
  const routine = await Routine.findByPk(id);

  if (!routine || routine.userId !== userId) {
    return null;
  }

  await routine.destroy();
  return routine;
}
