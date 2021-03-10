import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vending } from './vending.interface';
import { VendingDto } from './vending.dto';

@Injectable()
export class VendingService {
  constructor(
    @InjectModel('vendings') private readonly vendingModel: Model<any>,
  ) {}

  async findAll() {
    return await this.vendingModel.find({}).sort({ score: 'desc' }).exec();
  }

  async create(vending: VendingDto): Promise<any> {
    const createdVideo = new this.vendingModel(vending);
    console.log(createdVideo);
    console.log('created!');
    return await createdVideo.save();
  }
}
