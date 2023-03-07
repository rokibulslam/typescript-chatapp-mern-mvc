import { authUser, registerUser, allUser } from './../controllers/userController';
import express from 'express'
import { protect } from '../middleware/authUser';
import { addToGroup, createChat, createGroupChat, getChats, removeFromGroup, renameGroup } from '../controllers/chatController';

const router = express.Router();

// User Routes 
router.get('/users',protect, allUser)
router.post('/register', registerUser)
router.post("/login", authUser);

// Chat Route
router.get("/chats",protect, getChats)
router.post("/chat", protect, createChat);
router.post("/group", protect, createGroupChat);
router.put("/renamegroup", protect, renameGroup);
router.put("/remvovefromgroup", protect, removeFromGroup)
router.put("/addtogroup", protect, addToGroup);

export default router;