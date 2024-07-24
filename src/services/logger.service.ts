export class LoggerService {
  private static instance: LoggerService;

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }

    return LoggerService.instance;
  }

  log(message: string, caller: string) {
    console.log(`[${caller}] ${message}`);
  }

  error(message: string, error: Error | unknown, caller: string) {
    console.error(`[${caller}] ${message}`, error);
  }
}

export const logger = LoggerService.getInstance();
