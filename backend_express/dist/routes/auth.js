"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.route("/login").post(auth_1.LoginFunction);
router.route("/signup").post(auth_1.SignupFunction);
router.route("/getUsers").get(middlewares_1.middleware, auth_1.GetAllUsers);
router.route("/getSingleUser/:id").get(middlewares_1.middleware, auth_1.GetSingleUser);
exports.default = router;
