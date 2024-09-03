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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFunction = LoginFunction;
exports.SignupFunction = SignupFunction;
const db_1 = require("../db/db");
const utils_1 = require("../utils");
function LoginFunction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield db_1.prisma.user.findFirst({
                where: {
                    username,
                },
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found or wrong credentials",
                });
            }
            const decoded = yield (0, utils_1.verifyHashedPassword)(password, user === null || user === void 0 ? void 0 : user.password);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: "Wrong credentials",
                });
            }
            const token = (0, utils_1.genToken)(user === null || user === void 0 ? void 0 : user.id, user === null || user === void 0 ? void 0 : user.username);
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res.status(200).json({
                success: true,
                message: "successfull",
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });
}
function SignupFunction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const hashedPassword = yield (0, utils_1.hashPassword)(password);
            const newUser = yield db_1.prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            const token = (0, utils_1.genToken)(newUser.id, newUser.username);
            return res
                .cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
                .status(200)
                .json({
                success: true,
                message: "successfull",
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });
}
