import express from 'express';
import { showALLUsers,createNewUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showALLUsers);
router.post('/add',createNewUser);

export default router;