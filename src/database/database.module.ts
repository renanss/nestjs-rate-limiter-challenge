import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Courier, CourierSchema } from '../models/courier/courier.schema';
import { CourierSeeder } from './seeders/couriers.seeder';
import { Product, ProductSchema } from '../models/product/product.schema';
import { ProductsSeeder } from './seeders/products.seeder';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Courier.name, schema: CourierSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [CourierSeeder, ProductsSeeder],
})
export class DatabaseModule {}
