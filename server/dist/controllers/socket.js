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
exports.GetAllMessages = GetAllMessages;
const db_1 = require("../db/db");
function GetAllMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.body.userId);
            const fromId = Number(req.body.fromId);
            let userMessages = yield db_1.prisma.messages.findMany({
                where: {
                    OR: [
                        {
                            AND: [{ toId: userId }, { fromId: fromId }],
                        },
                        {
                            AND: [{ toId: fromId }, { fromId: userId }],
                        },
                    ],
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json({
                success: true,
                userMessages,
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });
}
