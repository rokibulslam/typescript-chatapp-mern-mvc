"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToGroup = exports.removeFromGroup = exports.renameGroup = exports.createGroupChat = exports.getChats = exports.createChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = __importDefault(require("../model/chatModel"));
exports.createChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        console.log("User Id not sent");
        res.send(400);
        return;
    }
    var isChat = yield chatModel_1.default.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: res.locals.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate({
        model: "User",
        path: "latestMessage.sender",
        select: "name pic email",
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [res.locals.user._id, userId],
        };
        try {
            const createdChat = yield chatModel_1.default.create(chatData);
            const FullChat = yield chatModel_1.default.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).json(FullChat);
        }
        catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
}));
exports.getChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield chatModel_1.default.find({
            users: { $elemMatch: { $eq: res.locals.user._id } },
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        //   .populate({
        //     model: "User",
        //     path: "latestMessage.sender",
        //     select: "name pic email",
        //   });
        res.send(data);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
exports.createGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.users || !req.body.name) {
        res.status(400).send({ message: "Please Fill up all fields" });
    }
    const users = JSON.parse(req.body.users);
    if (users.length < 2) {
        res.status(400).send("Please at least 3 users for group chat");
    }
    users.push(res.locals.user);
    try {
        const groupChat = yield chatModel_1.default.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: res.locals.user,
        });
        const fullGroupChat = yield chatModel_1.default.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
exports.renameGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName } = req.body;
    const updatedChat = yield chatModel_1.default.findByIdAndUpdate(chatId, {
        chatName: chatName,
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(updatedChat);
    }
}));
exports.removeFromGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    // check if the requester is admin
    const removed = yield chatModel_1.default.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(removed);
    }
}));
exports.addToGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    // check if the requester is admin
    const added = yield chatModel_1.default.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(added);
    }
}));
//# sourceMappingURL=chatController.js.map