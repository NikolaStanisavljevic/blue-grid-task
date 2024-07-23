import { Router } from "express";
import { fileRouter } from "./file.router";

const router = Router();

router.use(fileRouter);

export const rootRouter = router;
