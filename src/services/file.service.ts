import { CacheKeys } from "../constants/cache-keys";
import { OutputJson } from "../types/response";
import { APIService } from "./api.service";
import { cacheService } from "./cache.service";
import { DataService } from "./data.service";

export class FileService {
  private apiService: APIService;
  private dataService: DataService;

  constructor() {
    this.apiService = new APIService();
    this.dataService = new DataService();
  }

  public async getFiles(): Promise<OutputJson | null> {
    let data = cacheService.get<OutputJson>(CacheKeys.FILES);

    if (!data) {
      const rawData = await this.apiService.fetchData();
      data = await this.dataService.transform(rawData);
      cacheService.set<OutputJson>(CacheKeys.FILES, data);
    }

    return data;
  }
}
