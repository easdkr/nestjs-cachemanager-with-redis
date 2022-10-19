import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { RedisCacheService } from './redis-cache.service';
const cacheStoreRegisterConfig = {
  store: redisStore,
  host: 'localhost',
  port: 6379,
  db: 0,
  ttl: 0,
};

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => cacheStoreRegisterConfig,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
