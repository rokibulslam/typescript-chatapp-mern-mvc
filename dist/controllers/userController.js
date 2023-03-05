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
exports.authUser = exports.registerUser = void 0;
const jwt_1 = require("../config/jwt");
const userModel_1 = __importDefault(require("../model/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, picture } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error;
    }
    const userExist = yield userModel_1.default.findOne({ email });
    console.log(userExist);
    if (userExist) {
        throw new Error("User already exist");
    }
    // const user = await User.create({
    //     name, email, password, picture
    // })
    const user = yield userModel_1.default.create(req.body);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: (0, jwt_1.generateToken)(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create user");
    }
}));
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.comparePassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: (0, jwt_1.generateToken)(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
}));
//# sourceMappingURL=userController.js.map