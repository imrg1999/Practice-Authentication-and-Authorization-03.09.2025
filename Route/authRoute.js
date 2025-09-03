import express from 'express';
import { registerUser, loginUser,userProfile } from '../Controller/authController.js';
import { middleMan } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('login', loginUser);
router.get('/profile',middleMan,userProfile);

export default router;