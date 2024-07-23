export class LoggerService {
  log(message: string, caller: string) {
    console.log(`[${caller}] ${message}`);
  }

  error(message: string, error: Error | unknown, caller: string) {
    console.error(`[${caller}] ${message}`, error);
  }
}
