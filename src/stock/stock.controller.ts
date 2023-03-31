import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Get(':ticker')
  async getStockPrice(@Param('ticker') ticker: string): Promise<any> {
    return this.stockService.getStockPrice(ticker.toUpperCase());
  }
}