import { Router } from 'express';
import { login, perfil, register } from '../controllers/auth.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verificarToken, perfil);

export default router;
