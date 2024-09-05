"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const socket_1 = require("../controllers/socket");
const router = express_1.default.Router();
router.route("/getAllMessages").post(middlewares_1.middleware, socket_1.GetAllMessages);
exports.default = router;
