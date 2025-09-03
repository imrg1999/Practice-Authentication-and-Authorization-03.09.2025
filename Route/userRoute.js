import express from 'express';
import { showALLUsers,createNewUser,updateUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showALLUsers);
router.post('/add',createNewUser);
router.post('/update/:id',updateUser);

export default router;