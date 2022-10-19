import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheService } from './redis-cache.service';
import { Cache } from 'cache-manager';

describe('RedisCacheService', () => {
  let service: RedisCacheService;
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisCacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
            reset: jest.fn(),
          },
        },
      ],
    }).compile();
    cache = module.get(CACHE_MANAGER);
    service = module.get<RedisCacheService>(RedisCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create new cache', async () => {
    const spy = jest.spyOn(cache, 'set');

    await service.createCache('hi', 'there');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual('hi');
    expect(spy.mock.calls[0][1]).toEqual('there');
  });

  it('find cache by key', async () => {
    const spy = jest.spyOn(cache, 'get').mockResolvedValueOnce('there');

    const result = await service.findCacheByKey('hi');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual('there');
  });

  it('delete cache by key', async () => {
    const spy = jest.spyOn(cache, 'del');

    await service.deleteByKey('hi');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('delete all cache', async () => {
    const spy = jest.spyOn(cache, 'reset');

    await service.deleteAll();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
