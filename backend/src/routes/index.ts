import { Router } from 'express';
import authRoutes from './auth.routes';
import exerciseRoutes from './exercise.routes';
import muscleGroupRoutes from './muscleGroup.routes';
import workoutTemplateRoutes from './workoutTemplate.routes';
import workoutTemplateExerciseRoutes from './workoutTemplateExercise.routes';
import workoutRoutes from './workout.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/muscle-groups', muscleGroupRoutes);
router.use('/workout-templates', workoutTemplateRoutes);
router.use('/workout-template-exercises', workoutTemplateExerciseRoutes);
router.use('/workouts', workoutRoutes);


export default router;
