import express from "express";
import dotenv from "dotenv";
import { rootRouter } from "./routes/root.router";
import { cacheService } from "./services/cache.service";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use("/api", rootRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));

cacheService.init();
