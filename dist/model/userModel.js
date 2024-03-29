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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
userScema.methods.comparePassword = function (pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(pass, this.password);
    });
};
userScema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified) {
            next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
const User = mongoose_1.default.model("User", userScema);
exports.default = User;
//# sourceMappingURL=userModel.js.map