import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async findById(id) {
    return await this.vendingModel.find({ _id: id }).exec();
  }

  async findByLocation(locationId): Promise<Vending[]> {
    const products = await this.vendingModel
      .find({ location: locationId })
      .exec();

    if (products.length > 0) {
      return products;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(vending: VendingDto): Promise<Vending> {
    const craeteVending = new this.vendingModel(vending);
    console.log('created!', craeteVending);
    return await craeteVending.save();
  }

  async purchase(productId, quantity) {
    console.log('ID', productId);
    const product = await this.vendingModel.find({ _id: productId }).exec();
    console.log(product);
    const { remaining } = product[0];

    if (remaining > 0) {
      return await this.vendingModel
        .updateOne(
          { _id: productId },
          { remaining: product[0].remaining - quantity },
          { upsert: true },
        )
        .exec();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Out of stock!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
