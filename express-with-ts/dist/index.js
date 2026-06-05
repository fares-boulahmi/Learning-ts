"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const pet_1 = require("./pet");
const app = (0, express_1.default)();
const Port = 8000;
app.get("/", (req, res) => {
    res.json(pet_1.pets[(0, utils_1.getRandomIndex)(pet_1.pets)]);
});
app.listen(Port, () => {
    console.log(`Listening on port ${Port}`);
});
