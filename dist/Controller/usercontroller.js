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
const bcrypt_1 = __importDefault(require("bcrypt"));
const usermodel_1 = __importDefault(require("../model/usermodel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schems_1 = require("../schemas/schems");
const mykeys = process.env.mykey || "this is key";
const userrgister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, schems_1.validateUser)(req.body);
        if (error) {
            return res.status(404).json({ message: error.message });
        }
        const { name, email, password } = req.body;
        const already = yield usermodel_1.default.findOne({ email });
        if (already) {
            return res.status(200).json({ message: "user already exists" });
        }
        const hashed = yield bcrypt_1.default.hash(password, 10);
        const newuser = new usermodel_1.default({
            name,
            email,
            password: hashed
        });
        yield newuser.save();
        res.json(newuser);
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
        console.log(error);
    }
});
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const findone = yield usermodel_1.default.findById(id);
        if (!findone) {
            return res.status(404).json({ message: 'User not found' });
        }
        const webtoken = jsonwebtoken_1.default.sign({
            name: findone.name,
            email: findone.email,
            password: findone.password
        }, mykeys);
        res.status(200).json({ token: webtoken });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = { userrgister, find };
