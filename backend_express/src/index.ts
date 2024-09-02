import express from "express";
import http from "http";
import cors from "cors";
import authRoutes from "./routes/auth";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

const server = http.createServer(app);

server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
