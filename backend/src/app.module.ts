import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VendingController } from './vending.controller';
import { AppService } from './app.service';
import { VendingService } from './vending.service';

@Module({
  imports: [],
  controllers: [AppController, VendingController],
  providers: [AppService, VendingService],
})
export class AppModule {}
