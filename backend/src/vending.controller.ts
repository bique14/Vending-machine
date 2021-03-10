import { Controller, Get, Param, Query } from '@nestjs/common';
import { VendingService } from './vending.service';

@Controller()
export class VendingController {
  constructor(private readonly vendingService: VendingService) {}

  @Get('admin')
  getAll(): any {
    return this.vendingService.getAllData();
  }

  @Get('vending')
  getProduct(@Query() query) {
    const { location } = query;
    return this.vendingService.getByLocation(location);
  }
}
