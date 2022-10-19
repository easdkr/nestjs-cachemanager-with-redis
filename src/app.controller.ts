import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

interface CacheDTO {
  key: string;
  value: string;
}

@Controller('/cache')
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @HttpCode(201)
  async createCache(@Body() body: CacheDTO): Promise<unknown> {
    const { key, value } = body;
    const result = await this.appService.createCache(key, value);
    return result;
  }

  @Get('/:key')
  async findCacheByKey(@Param('key') key: string): Promise<string> {
    const result = await this.appService.findCacheByKey(key);
    return result;
  }

  @Delete('/:key')
  @HttpCode(204)
  async deleteByKey(@Param('key') key: string): Promise<unknown> {
    const result = await this.appService.deleteByKey(key);
    return result;
  }

  @Delete()
  @HttpCode(204)
  async deleteAll(): Promise<void> {
    const result = await this.appService.deleteAll();
    return result;
  }
}
