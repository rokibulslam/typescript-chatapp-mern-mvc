import { registerUser } from './../controllers/userController';
import express from 'express'

const router = express.Router();

router.post('/register', registerUser)
router.post('/login ')


export default router;