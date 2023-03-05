"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userScema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: {
        type: String,
        default: "https://i.ibb.co/Qd16vVN/istockphoto-522855255-612x612.jpg",
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userScema);
exports.default = User;
//# sourceMappingURL=userModel.js.map