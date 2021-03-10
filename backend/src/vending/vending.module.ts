import { Module } from '@nestjs/common';
import { VendingController } from './vending.controller';
import { VendingService } from './vending.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VendingSchema } from '../schema/vending.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'vendings', schema: VendingSchema }]),
  ],
  controllers: [VendingController],
  providers: [VendingService],
})
export class VendingModule {}
