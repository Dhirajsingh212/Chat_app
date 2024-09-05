"use strict";
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
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Work fine");
});
app.use("/api/v1/auth", auth_1.default);
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
                const parsedData = JSON.parse(data.toString("utf-8"));
                parsedData.fromId = decoded.id;
                if ((client.id === parsedData.id || client.id === decoded.id) &&
                    ws_1.WebSocket &&
                    client.ws.readyState == ws_1.WebSocket.OPEN) {
                    client.ws.send(JSON.stringify(parsedData), { binary: isBinary });
                }
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
