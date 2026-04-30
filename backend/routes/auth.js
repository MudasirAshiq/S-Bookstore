import { Router } from 'express';
import { login, getSettings, updateSettings } from '../controllers/authController.js';
import { validateLogin } from '../middleware/validate.js';

const router = Router();

/**
 * Auth API Routes
 * 
 * POST /api/auth/login      → Admin login
 * GET  /api/auth/settings    → Get dashboard settings
 * PUT  /api/auth/settings    → Update dashboard settings / password
 */

router.post('/login', validateLogin, login);
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;
