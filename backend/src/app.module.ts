import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VendingModule } from './vending/vending.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/scg'),
    VendingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
