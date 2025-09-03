import express from 'express';
import { showALLUsers,
    createNewUser,
    updateUser,
    deleteUser,
findUsersById } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showALLUsers);
router.post('/add',createNewUser);
router.post('/update/:id',updateUser);
router.delete('delete/:id',deleteUser);
router.get('/user/:id',findUsersById);

export default router;