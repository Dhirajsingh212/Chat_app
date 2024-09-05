import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import morgan from "morgan";
import { WebSocket, WebSocketServer } from "ws";
import authRoutes from "./routes/auth";
import socketRoutes from "./routes/socket";
import { saveToDB, verifyToken } from "./utils";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Work fine");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", socketRoutes);

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

interface Client {
  ws: any;
  id: number;
}

let clientsMap = new Map<number, Client>();

function addClient(client: Client) {
  clientsMap.set(client.id, client);
}

wss.on("connection", function connection(ws, request: Request) {
  ws.on("error", console.error);

  const token = (request.headers as any).cookie;
  const regex = /access_token=([^;]+)/;

  const match = token.match(regex);
  const accessToken = match ? match[1] : null;

  if (!accessToken) {
    ws.close();
  }

  try {
    const decoded = verifyToken(accessToken);
    addClient({ ws, id: (decoded as any).id });

    ws.on("message", function message(data, isBinary) {
      clientsMap.forEach(async function each(client: any) {
        const parsedData = JSON.parse(data.toString("utf-8"));
        parsedData.fromId = (decoded as any).id;
        if (
          (client.id === parsedData.toId ||
            client.id === (decoded as any).id) &&
          client.ws.readyState == WebSocket.OPEN
        ) {
          if (client.id === (decoded as any).id) {
            await saveToDB({
              message: parsedData.msg,
              toId: Number(parsedData.toId),
              fromId: Number(parsedData.fromId),
            });
          }
          client.ws.send(JSON.stringify(parsedData), { binary: isBinary });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

server.listen(process.env.PORT, function () {
  console.log(`Listening on ${process.env.PORT}`);
});
