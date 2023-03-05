"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const routes_1 = __importDefault(require("./routes/routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
(0, db_js_1.default)();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => { res.send("API is Running"); });
app.use("/api", routes_1.default);
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => { console.log(`Server is Started on ${PORT}`); });
//# sourceMappingURL=server.js.map