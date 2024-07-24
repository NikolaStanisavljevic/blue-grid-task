import { Request, Response } from "express";
import { FileService } from "../services/file.service";
import { logger } from "../services/logger.service";

export class FileController {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  getFiles = async (_: Request, res: Response) => {
    const caller = `${this.constructor.name}.getFiles`;

    try {
      logger.log("Invoked", caller);
      const output = await this.fileService.getFiles();

      return res.status(200).json(output);
    } catch (error) {
      logger.error("Error processing request", error, caller);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
