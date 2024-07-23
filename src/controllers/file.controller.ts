import { Request, Response } from "express";
import { FileService } from "../services/file.service";
import { LoggerService } from "../services/logger.service";

export class FileController {
  private fileService: FileService;
  private logger: LoggerService;

  constructor() {
    this.fileService = new FileService();
    this.logger = new LoggerService();
  }

  getFiles = async (req: Request, res: Response) => {
    const caller = `${this.constructor.name}.getFiles`;

    try {
      this.logger.log("Invoked", caller);
      const output = await this.fileService.getFiles();

      return res.status(200).json(output);
    } catch (error) {
      this.logger.error("Error processing request", error, caller);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
