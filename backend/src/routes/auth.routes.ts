import { Router } from 'express';
import { login, verifyMFA, bindDevice } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/mfa/verify', verifyMFA);
router.post('/device/bind', verifyToken, bindDevice);

export default router;
