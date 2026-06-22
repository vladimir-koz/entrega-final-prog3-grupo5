import { Router } from 'express';
import authRoutes from './auth.routes';
import exerciseRoutes from './exercise.routes';
import routineRoutes from './routine.routes';
import routineSetRoutes from './routineSet.routes';

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
router.use('/routines', routineRoutes);
router.use('/routine-sets', routineSetRoutes);

export default router;
