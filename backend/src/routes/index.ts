import { Router } from 'express';
import authRoutes from './auth.routes';
import ejerciciosRoutes from './ejercicios.routes';

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
router.use('/ejercicios', ejerciciosRoutes);


export default router;
