import axios from "axios";
import { logger } from "./logger.service";
import { DataResponse } from "../types/response";

export class APIService {
  async fetchData(): Promise<DataResponse | null> {
    const caller = `${this.constructor.name}.fetchData`;

    try {
      logger.log("Fetch URLs", caller);
      const response = await axios.get(
        process.env.BLUE_GRID_TEST_URL as string,
      );

      return response.data as DataResponse;
    } catch (error) {
      logger.error("Error fetching data", error, caller);

      return null;
    }
  }
}
