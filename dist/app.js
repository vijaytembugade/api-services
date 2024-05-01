"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenValidator_1 = __importDefault(require("./middlewares/tokenValidator"));
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFound_middleware_1 = __importDefault(require("./middlewares/notFound.middleware"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '16kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '16kb' }));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
// routes
app.use('/api/v1/user', user_routes_1.default);
app.use(tokenValidator_1.default);
app.use('/api/v1/project', project_routes_1.default);
app.use('/', test_routes_1.default);
app.use(notFound_middleware_1.default);
exports.default = app;
