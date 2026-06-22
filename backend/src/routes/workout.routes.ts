import { Router } from 'express';
import {
  createWorkout,
  deleteWorkout,
  getWorkoutById,
  listWorkouts,
  updateWorkout
} from '../controllers/workout.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(verificarToken);

router.get('/', listWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
