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
exports.middleware = middleware;
const utils_1 = require("../utils");
function middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.cookie;
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "unauthorized returned 1",
                });
            }
            const regex = /access_token=([^;]+)/;
            const match = token.match(regex);
            const accessToken = match ? match[1] : null;
            if (!accessToken) {
                return res.status(400).json({
                    success: false,
                    message: "unauthorized returned 2",
                });
            }
            const decoded = (0, utils_1.verifyToken)(accessToken);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access 3",
                });
            }
            req.body.userId = decoded.id;
            next();
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
