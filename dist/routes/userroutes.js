"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = __importDefault(require("../Controller/usercontroller"));
const route = express_1.default.Router();
route.post("/post", usercontroller_1.default.userrgister);
route.get("/getone/:id", usercontroller_1.default.find);
exports.default = route;
