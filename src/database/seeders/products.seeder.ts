import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Product, ProductDocument } from '../../models/product/product.schema';

@Injectable()
export class ProductsSeeder {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createSeedData() {
    const products = [
      await this.productModel.create({
        name: 'Headphones',
        description: 'Headphones for listening to music',
        price: 9999,
        created: new Date(),
        updated: new Date(),
      }),
      await this.productModel.create({
        name: 'Laptop',
        description: 'Laptop for programming',
        price: 299999,
        created: new Date(),
        updated: new Date(),
      }),
      await this.productModel.create({
        name: 'Mobile',
        description: 'Mobile for calling',
        price: 99900,
        created: new Date(),
        updated: new Date(),
      }),
      await this.productModel.create({
        name: 'Tablet',
        description: 'Tablet for watching movies',
        price: 49959,
        created: new Date(),
        updated: new Date(),
      }),
      await this.productModel.create({
        name: 'Camera',
        description: 'Camera for taking pictures',
        price: 19900,
        created: new Date(),
        updated: new Date(),
      }),
      await this.productModel.create({
        name: 'Smart Watch',
        description: 'Smart Watch for tracking fitness',
        price: 29999,
        created: new Date(),
        updated: new Date(),
      }),
    ];

    await Promise.all(products.map((product) => product.save()));
  }
}
