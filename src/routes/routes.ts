import { authUser, registerUser, allUser } from './../controllers/userController';
import express from 'express'
import { protect } from '../middleware/authUser';

const router = express.Router();

router.get('/users',protect, allUser)
router.post('/register', registerUser)
router.post("/login", authUser);


export default router;