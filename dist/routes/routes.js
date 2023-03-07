"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controllers/userController");
const express_1 = __importDefault(require("express"));
const authUser_1 = require("../middleware/authUser");
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
// User Routes 
router.get('/users', authUser_1.protect, userController_1.allUser);
router.post('/register', userController_1.registerUser);
router.post("/login", userController_1.authUser);
// Chat Route
router.get("/chats", authUser_1.protect, chatController_1.getChats);
router.post("/chat", authUser_1.protect, chatController_1.createChat);
router.post("/group", authUser_1.protect, chatController_1.createGroupChat);
router.put("/renamegroup", authUser_1.protect, chatController_1.renameGroup);
router.put("/remvovefromgroup", authUser_1.protect, chatController_1.removeFromGroup);
router.put("/addtogroup", authUser_1.protect, chatController_1.addToGroup);
exports.default = router;
//# sourceMappingURL=routes.js.map