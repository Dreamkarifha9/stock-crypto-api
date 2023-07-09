import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';
import { Cache } from 'cache-manager';

@Injectable()
export class StockService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) { }

  async getStockPrice(ticker: string): Promise<any> {
    const cachedPrice = await this.getFromCache(ticker);
    console.log('cachedPrice', cachedPrice);
    if (cachedPrice !== undefined && cachedPrice !== null) {
      return { price: cachedPrice };
    }

    const quote = await yahooFinance.quote(ticker);
    const { regularMarketPrice, currency } = quote;
    console.log('regularMarketPrice', regularMarketPrice);
    console.log('currency', currency);

    await this.saveToCache(ticker, regularMarketPrice);

    return { price: regularMarketPrice };
  }

  private async getFromCache(ticker: string): Promise<number | null> {
    return await this.cacheManager.get(ticker);
  }

  private async saveToCache(ticker: string, price: number) {
    return await this.cacheManager.set(`${ticker}`, price, { ttl: 0 });
  }
}
