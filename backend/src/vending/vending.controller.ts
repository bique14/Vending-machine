import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { VendingService } from './vending.service';
import { Vending } from './vending.interface';

@Controller()
export class VendingController {
  constructor(private readonly vendingService: VendingService) {}

  @Get('admin')
  async getAll(): Promise<any[]> {
    return await this.vendingService.findAll();
  }

  @Put()
  createVending(@Body() vending: Vending) {
    // for mock data only
    return this.vendingService.create(vending);
  }

  @Get('vending')
  getProduct(@Query() query) {
    const { id } = query;
    return this.vendingService.findById(id);
  }

  @Put('vending')
  purchase(@Body() body: { id: string; quantity: number }) {
    const { id, quantity } = body;
    return this.vendingService.purchase(id, quantity);
  }
}
