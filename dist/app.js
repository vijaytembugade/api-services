"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Apis are running' });
});
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Apis are running- test' });
});
app.listen(process.env.PORT, () => {
    console.log('app is running on PORT', process.env.PORT);
});
//# sourceMappingURL=app.js.map