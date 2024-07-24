import axios from "axios";
import { APIService } from "../services/api.service";
import { logger } from "../services/logger.service";

jest.mock("axios");
jest.mock("../services/logger.service");

process.env.BLUE_GRID_TEST_URL = "https://mock-example.com/api/test";

describe("APIService", () => {
  const apiService = new APIService();

  it("should fetch data successfully", async () => {
    const mockData = {
      items: [
        { fileUrl: "http://mockdata/test1" },
        { fileUrl: "http://mockdata/test2" },
      ],
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await apiService.fetchData();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("https://mock-example.com/api/test");
    expect(logger.log).toHaveBeenCalledWith(
      "Fetch URLs",
      "APIService.fetchData",
    );
  });

  it("should handle errors", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await apiService.fetchData();

    expect(result).toBeNull();
    expect(logger.error).toHaveBeenCalledWith(
      "Error fetching data",
      expect.any(Error),
      "APIService.fetchData",
    );
  });
});
