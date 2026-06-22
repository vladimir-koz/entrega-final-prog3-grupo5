import { RoutineSet } from '../models';
import { Exercise } from '../models/Exercise';

export interface RoutineSetCreateData {
  routineId: number;
  exerciseId: number;
  orden: number;
  repeticiones: number;
  peso?: number | null;
}

export async function findRoutineSetsByRoutineId(routineId: number) {
  return RoutineSet.findAll({
    where: { routineId },
    order: [['orden', 'ASC']],
    include: [
      {
        model: Exercise,
        as: 'exercise'
      }
    ]
  });
}

export async function findRoutineSetById(id: number) {
  return RoutineSet.findByPk(id, {
    include: [
      {
        model: Exercise,
        as: 'exercise'
      }
    ]
  });
}

export async function createRoutineSet(data: RoutineSetCreateData) {
  return RoutineSet.create(data);
}

export async function updateRoutineSet(id: number, data: Partial<RoutineSetCreateData>) {
  const routineSet = await RoutineSet.findByPk(id);

  if (!routineSet) {
    return null;
  }

  return routineSet.update(data);
}

export async function deleteRoutineSet(id: number) {
  const routineSet = await RoutineSet.findByPk(id);

  if (!routineSet) {
    return null;
  }

  await routineSet.destroy();
  return routineSet;
}
