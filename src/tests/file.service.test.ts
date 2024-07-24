import { FileService } from "../services/file.service";
import { APIService } from "../services/api.service";
import { DataService } from "../services/data.service";
import { cacheService } from "../services/cache.service";
import { CacheKeys } from "../constants/cache-keys";

jest.mock("../services/api.service");
jest.mock("../services/data.service");
jest.mock("../services/cache.service");

describe("FileService", () => {
  let fileService: FileService;
  let mockApiData, mockTransformedData;

  beforeEach(() => {
    fileService = new FileService();
    mockApiData = {
      items: [
        { fileUrl: "http://mockdata/test1" },
        { fileUrl: "http://mockdata/test2" },
      ],
    };
    mockTransformedData = { transformed: "data" };

    jest.resetAllMocks();
    (APIService.prototype.fetchData as jest.Mock).mockResolvedValue(
      mockApiData,
    );
    (DataService.prototype.transform as jest.Mock).mockResolvedValue(
      mockTransformedData,
    );
    (cacheService.get as jest.Mock).mockReturnValue(null);
    (cacheService.set as jest.Mock).mockImplementation();
  });

  it("checks cache before fetching data", async () => {
    await fileService.getFiles();
    expect(cacheService.get).toHaveBeenCalledWith(CacheKeys.FILES);
  });

  it("fetches data from API if not in cache", async () => {
    await fileService.getFiles();
    expect(APIService.prototype.fetchData).toHaveBeenCalled();
  });

  it("returns cached data without fetching from the API if available", async () => {
    (cacheService.get as jest.Mock).mockReturnValue(mockTransformedData);
    await fileService.getFiles();
    expect(APIService.prototype.fetchData).not.toHaveBeenCalled();
    expect(DataService.prototype.transform).not.toHaveBeenCalled();
    expect(cacheService.set).not.toHaveBeenCalled();
    expect(cacheService.get).toHaveBeenCalledWith(CacheKeys.FILES);
  });

  it("transforms data after fetching from API", async () => {
    await fileService.getFiles();
    expect(DataService.prototype.transform).toHaveBeenCalledWith(mockApiData);
  });

  it("sets cache with transformed data", async () => {
    await fileService.getFiles();
    expect(cacheService.set).toHaveBeenCalledWith(
      CacheKeys.FILES,
      mockTransformedData,
    );
  });
});
