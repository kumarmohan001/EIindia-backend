import express from 'express';

const router = express.Router();
import { signup , login } from '../Controller/auth.js';
// import { authenticateToken } from '../Middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);

// router.get('/profile', authenticateToken, getUserProfile);

export default router;
