import express from 'express';

const router = express.Router();
import { getAllUsers ,getUserById} from '../Controller/userController.js';
// import { authenticateToken } from '../Middleware/authMiddleware.js';

router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:_id', getUserById);
// router.get('/profile', authenticateToken, getUserProfile);

export default router;
