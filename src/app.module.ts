import { CacheModule, Module } from '@nestjs/common';

import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class AppModule { }
