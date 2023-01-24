import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getProductList(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }
}
