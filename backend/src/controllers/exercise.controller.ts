import { NextFunction, Request, Response } from 'express';
import {
  createExercise,
  deleteExercise,
  getExerciseById,
  listExercises,
  updateExercise
} from '../services/exercise.service';

export async function index(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await listExercises();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await getExerciseById(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await createExercise(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await updateExercise(Number(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await deleteExercise(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
}
