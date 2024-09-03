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
exports.genToken = genToken;
exports.verifyToken = verifyToken;
exports.hashPassword = hashPassword;
exports.verifyHashedPassword = verifyHashedPassword;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function genToken(id, username) {
    return jsonwebtoken_1.default.sign({ id, username }, process.env.SECRET, {
        expiresIn: process.env.END,
    });
}
function verifyToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    return decoded;
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        return hashedPassword;
    });
}
function verifyHashedPassword(password, dbpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const correct = yield bcryptjs_1.default.compare(password, dbpassword);
        if (correct) {
            return true;
        }
        return false;
    });
}
