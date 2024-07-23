import { Router } from "express";
import { FileController } from "../controllers/file.controller";

const fileController = new FileController();

const router = Router();

router.get("/files", fileController.getFiles);

export const fileRouter = router;
