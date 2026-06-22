import { Router } from 'express';
import EjerciciosController from '../controllers/ejercicios.controllers';

const router = Router();
const controller = new EjerciciosController();

router.get('/', controller.getAll);
router.get('/:id', controller.getExercise);
router.post('/', controller.createExercise);
router.delete('/:id', controller.deleteExercise);

export default router;
