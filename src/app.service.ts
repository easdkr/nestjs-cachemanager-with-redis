import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './redis-cache/redis-cache.service';

export interface CacheDTO {
  key: string;
  value: string;
}

@Injectable()
export class AppService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async createCache(key: string, value: string): Promise<void> {
    const result = await this.redisCacheService.createCache(key, value);
    return result;
  }

  async findCacheByKey(key: string): Promise<string> {
    const result = await this.redisCacheService.findCacheByKey(key);
    return result;
  }

  async deleteAll(): Promise<void> {
    const result = await this.redisCacheService.deleteAll();
    return result;
  }

  async deleteByKey(key: string): Promise<unknown> {
    const result = await this.redisCacheService.deleteByKey(key);
    return result;
  }
}
