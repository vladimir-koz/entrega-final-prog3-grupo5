import { NextFunction, Request, Response } from 'express';
import {
  createRoutineSetService,
  deleteRoutineSetService,
  getRoutineSetById,
  listRoutineSets,
  updateRoutineSetService
} from '../services/routineSet.service';

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const routineId = Number(req.query.routineId);

    if (!routineId) {
      res.status(400).json({ error: 'routineId es requerido como query param' });
      return;
    }

    const result = await listRoutineSets(routineId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await getRoutineSetById(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await createRoutineSetService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await updateRoutineSetService(Number(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await deleteRoutineSetService(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
}
