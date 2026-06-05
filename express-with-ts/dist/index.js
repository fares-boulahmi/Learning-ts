"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const Port = 8000;
app.listen(Port, () => {
    console.log(`Listening on port ${Port}`);
});
app.get("/", (req, res) => {
    res.json({
        name: "mamia ",
    });
});
