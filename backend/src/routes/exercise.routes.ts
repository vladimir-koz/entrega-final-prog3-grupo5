import { Router } from 'express';
import { byMuscleGroup, destroy, index, show, store, update } from '../controllers/exercise.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(verificarToken);

router.get('/', index);
router.get('/grupo/:muscleGroupId', byMuscleGroup);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
