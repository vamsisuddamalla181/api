"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUser = (data) => {
    return joi_1.default.object({
        name: joi_1.default.string().min(5).max(10).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    }).validate(data);
};
exports.validateUser = validateUser;
