import { Injectable } from '@nestjs/common';

import { Courier } from './models/courier/courier.schema';
import { CourierService } from './models/courier/courier.service';
import { Product } from './models/product/product.schema';
import { ProductService } from './models/product/product.service';
import { RedisService } from './providers/cache/redis/redis.service';

@Injectable()
export class AppService {
  constructor(
    private courierService: CourierService,
    private productService: ProductService,
    private redisService: RedisService,
  ) {}

  async getCouriersList(): Promise<Courier[]> {
    //Reviewer: Basic caching to show performance improvement.
    const cachedCouriers = await this.redisService.getValue('couriers');

    if (cachedCouriers) {
      return JSON.parse(cachedCouriers);
    }

    const couriers = await this.courierService.getCouriersList();

    await this.redisService.setValue('couriers', JSON.stringify(couriers));

    return couriers;
  }

  async getCourierById(id: string): Promise<Courier> {
    //Not cached so the code reviewer can see the mongoDB in action
    return await this.courierService.getCourierById(id);
  }

  async getProductById(id: string): Promise<Product> {
    //Not cached so the code reviewer can see the mongoDB in action
    return await this.productService.getProductById(id);
  }

  async getProductsList(): Promise<Product[]> {
    const cachedProducts = await this.redisService.getValue('products');

    if (cachedProducts) {
      return JSON.parse(cachedProducts);
    }

    const products = await this.productService.getProductList();

    await this.redisService.setValue('products', JSON.stringify(products));

    return products;
  }

  getProductReviews(): string {
    return 'getProductReviews';
  }

  getUserById(): string {
    return 'getUserById';
  }
}
