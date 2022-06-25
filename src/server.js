"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./handlers/user"));
const product_1 = __importDefault(require("./handlers/product"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
let port = 3000;
if (process.env.ENV === "test") {
    port = 3001;
}
const address = `127.0.0.1:${port}`;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../index.html"));
});
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, () => {
    console.info(`app started on: ${address}`);
});
exports.default = app;
