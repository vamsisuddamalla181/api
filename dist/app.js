"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userroutes_1 = __importDefault(require("./routes/userroutes"));
dotenv_1.default.config();
const PORT = 5000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
const url = process.env.MONGO_URL;
if (!url) {
    throw new Error("can not find mongo url");
}
mongoose_1.default.connect(url)
    .then(() => {
    console.log("server is connected to the database");
})
    .catch((error) => {
    console.log("error" + error);
});
//morgan
app.get("/", (req, res) => {
    res.send("hello this is from morgan");
});
app.use("/user", userroutes_1.default);
app.listen(PORT, () => {
    console.log(`server is running on the ${PORT}`);
});
