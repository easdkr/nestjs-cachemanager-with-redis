import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async createCache(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value, { ttl: 0 });
  }

  async findCacheByKey(key: string): Promise<string> {
    return (await this.cacheManager.get(key)) as string;
  }

  async deleteAll(): Promise<void> {
    return await this.cacheManager.reset();
  }

  async deleteByKey(key: string): Promise<unknown> {
    return await this.cacheManager.del(key);
  }
}
