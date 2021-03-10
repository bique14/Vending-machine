import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { VendingService } from './vending.service';
import { Vending } from './vending.interface';

const mockData = require('./mock/data.json');

@Controller()
export class VendingController {
  constructor(private readonly vendingService: VendingService) {}

  @Get('admin')
  async getAll(): Promise<any[]> {
    return await this.vendingService.findAll();
  }

  @Put()
  saveVideo(@Body() vending: Vending) {
    return this.vendingService.create({
      location: 'siam',
      id: 'coca-cola-coke',
      name: 'Coke',
      image:
        'https://backend.tops.co.th/media//catalog/product/8/8/8851959132012.jpg',
      price: '15',
      quantity: {
        remaining: 100,
        total: 100,
      },
    });
  }
}
