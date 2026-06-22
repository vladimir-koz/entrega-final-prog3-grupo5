import { NextFunction, Request, Response } from 'express';
import {
  createRoutineSetService,
  deleteRoutineSetService,
  getRoutineSetById,
  listRoutineSets,
  updateRoutineSetService
} from '../services/routineSet.service';
import { AppError } from '../utils/AppError';

function getAuthenticatedUserId(req: Request): number {
  if (!req.user) {
    throw new AppError('Usuario no autenticado', 401);
  }

  return req.user.id;
}

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const routineId = Number(req.query.routineId);

    if (!routineId) {
      res.status(400).json({ error: 'El query param routineId es obligatorio' });
      return;
    }

    const result = await listRoutineSets(routineId, getAuthenticatedUserId(req));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await getRoutineSetById(Number(req.params.id), getAuthenticatedUserId(req));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await createRoutineSetService(req.body, getAuthenticatedUserId(req));
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await updateRoutineSetService(Number(req.params.id), req.body, getAuthenticatedUserId(req));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await deleteRoutineSetService(Number(req.params.id), getAuthenticatedUserId(req));
    res.json(result);
  } catch (error) {
    next(error);
  }
}
