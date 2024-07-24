import NodeCache from "node-cache";
import { logger } from "./logger.service";
import { CacheKeys } from "../constants/cache-keys";
import { APIService } from "./api.service";
import { DataService } from "./data.service";

export class CacheService {
  private static instance: CacheService;
  private cache: NodeCache;
  private apiService: APIService;
  private dataService: DataService;

  private constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
    });

    this.apiService = new APIService();
    this.dataService = new DataService();
  }

  async init(): Promise<void> {
    const caller = `${this.constructor.name}.init`;

    const rawData = await this.apiService.fetchData();
    const structuredJson = await this.dataService.transform(rawData);

    this.set(CacheKeys.FILES, structuredJson);
    logger.log("Cache initialized", caller);
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService(3600);
    }
    return CacheService.instance;
  }

  set<T>(key: string, value: T): boolean {
    const caller = `${this.constructor.name}.set`;
    logger.log(`Cache set with key: ${key}`, caller);

    return this.cache.set(key, value);
  }

  get<T>(key: string): T | undefined {
    const caller = `${this.constructor.name}.get`;
    logger.log(`Cache used with key: ${key}`, caller);

    return this.cache.get<T>(key);
  }
}

export const cacheService = CacheService.getInstance();
