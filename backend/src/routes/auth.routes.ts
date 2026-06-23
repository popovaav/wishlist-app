import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

export default router;
