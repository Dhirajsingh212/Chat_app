import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import { WebSocketServer } from "ws";
import authRoutes from "./routes/auth";
import { verifyToken } from "./utils";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

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
    console.log(decoded);
    addClient({ ws, id: (decoded as any).id });

    ws.on("message", function message(data, isBinary) {
      clientsMap.forEach(function each(client: any) {
        const parsedData = JSON.parse(data.toString("utf-8"));
        parsedData.fromId = (decoded as any).id;
        if (
          (client.id === parsedData.id || client.id === (decoded as any).id) &&
          client.ws.readyState === WebSocket.OPEN
        ) {
          client.ws.send(JSON.stringify(parsedData), { binary: isBinary });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
