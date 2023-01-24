//Module for the couriers

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Courier, CourierSchema } from './courier.schema';
import { CourierService } from './courier.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Courier.name, schema: CourierSchema }]),
  ],
  providers: [CourierService],
  exports: [CourierService],
})
export class CouriersModule {}
