import express from "express";
import dotenv from "dotenv";
import { rootRouter } from "./routes";

dotenv.config();

const app = express();

app.use("/api", rootRouter);

app.listen(4500, () => console.log("Listening on port 4500..."));
