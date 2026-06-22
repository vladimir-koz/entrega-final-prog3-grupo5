import { NextFunction, Request, Response } from 'express';
import {
    getAllExercises,
    getExerciseById,
    createExercise as createExerciseService,
    deleteExercise as deleteExerciseService
} from '../services/ejercicios.service';

export default class EjerciciosController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await getAllExercises();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getExercise(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await getExerciseById(+req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async createExercise(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await createExerciseService(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteExercise(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await deleteExerciseService(+req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
