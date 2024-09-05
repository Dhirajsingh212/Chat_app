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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const ws_1 = require("ws");
const auth_1 = __importDefault(require("./routes/auth"));
const socket_1 = __importDefault(require("./routes/socket"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Work fine");
});
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/messages", socket_1.default);
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server: server });
let clientsMap = new Map();
function addClient(client) {
    clientsMap.set(client.id, client);
}
wss.on("connection", function connection(ws, request) {
    ws.on("error", console.error);
    const token = request.headers.cookie;
    const regex = /access_token=([^;]+)/;
    const match = token.match(regex);
    const accessToken = match ? match[1] : null;
    if (!accessToken) {
        ws.close();
    }
    try {
        const decoded = (0, utils_1.verifyToken)(accessToken);
        addClient({ ws, id: decoded.id });
        ws.on("message", function message(data, isBinary) {
            clientsMap.forEach(function each(client) {
                return __awaiter(this, void 0, void 0, function* () {
                    const parsedData = JSON.parse(data.toString("utf-8"));
                    parsedData.fromId = decoded.id;
                    if ((client.id === parsedData.toId ||
                        client.id === decoded.id) &&
                        client.ws.readyState == ws_1.WebSocket.OPEN) {
                        if (client.id === decoded.id) {
                            yield (0, utils_1.saveToDB)({
                                message: parsedData.msg,
                                toId: Number(parsedData.toId),
                                fromId: Number(parsedData.fromId),
                            });
                        }
                        client.ws.send(JSON.stringify(parsedData), { binary: isBinary });
                    }
                });
            });
        });
    }
    catch (err) {
        console.log(err);
    }
});
server.listen(process.env.PORT, function () {
    console.log(`Listening on ${process.env.PORT}`);
});
