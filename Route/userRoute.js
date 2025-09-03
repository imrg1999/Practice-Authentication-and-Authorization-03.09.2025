import express from 'express';
import { showALLUsers } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showALLUsers);


export default router;