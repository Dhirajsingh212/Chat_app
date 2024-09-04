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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const ws_1 = require("ws");
const auth_1 = __importDefault(require("./routes/auth"));
const utils_1 = require("./utils");
const db_1 = require("./db/db");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/auth", auth_1.default);
app.get("/api/v1/getUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield db_1.prisma.user.findMany({
            select: {
                id: true,
                username: true,
            },
        });
        return res.status(200).json({
            success: true,
            allUser,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
        });
    }
}));
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server: server });
// Create a Map to store objects by their id
let clientsMap = new Map();
// Function to add a client to the Map
function addClient(client) {
    clientsMap.set(client.id, client); // This will update the client if the id already exists
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
        console.log(decoded);
        addClient({ ws, id: decoded.id });
        ws.on("message", function message(data, isBinary) {
            clientsMap.forEach(function each(client) {
                const parsedData = JSON.parse(data.toString("utf-8"));
                if ((client.id === parsedData.id || client.id === decoded.id) &&
                    client.ws.readyState === WebSocket.OPEN) {
                    client.ws.send(data, { binary: isBinary });
                }
            });
        });
    }
    catch (err) {
        console.log(err);
    }
    ws.send("Hello! Message From Server!!");
});
server.listen(8080, function () {
    console.log("Listening on http://localhost:8080");
});
