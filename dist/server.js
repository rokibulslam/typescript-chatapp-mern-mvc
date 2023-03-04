"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data/data");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.get('/', (req, res) => { res.send("API is Running"); });
app.get('/chats', (req, res) => {
    res.send(data_1.chats);
});
app.listen(PORT, () => { console.log(`Server is Started on ${PORT}`); });
//# sourceMappingURL=server.js.map