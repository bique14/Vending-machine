import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vending } from './vending.interface';
import { VendingDto } from './vending.dto';

@Injectable()
export class VendingService {
  constructor(
    @InjectModel('vendings') private readonly vendingModel: Model<Vending>,
  ) {}

  async findAll() {
    return await this.vendingModel.find({}).sort({ score: 'desc' }).exec();
  }

  async create(vending: VendingDto): Promise<Vending> {
    const craeteVending = new this.vendingModel(vending);
    console.log('created!', craeteVending);
    return await craeteVending.save();
  }
}
