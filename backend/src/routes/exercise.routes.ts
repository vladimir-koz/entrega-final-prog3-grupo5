import { Router } from 'express';
import { byMuscleGroup, destroy, index, show, store, update } from '../controllers/exercise.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { idParamValidator } from '../validators/common.validators';
import { createExerciseValidator, updateExerciseValidator } from '../validators/exercise.validators';

const router = Router();

router.use(verificarToken);

router.get('/', index);
router.get('/:id', idParamValidator, validateRequest, show);
router.get('/grupo/:muscleGroupId', idParamValidator, validateRequest, byMuscleGroup);
router.post('/', createExerciseValidator, validateRequest, store);
router.put('/:id', idParamValidator, updateExerciseValidator, validateRequest, update);
router.delete('/:id', idParamValidator, validateRequest, destroy);


export default router;
