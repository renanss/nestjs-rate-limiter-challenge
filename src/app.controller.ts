import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Courier } from './models/courier/courier.schema';
import { Product } from './models/product/product.schema';

import { RedisService } from './providers/cache/redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  /* Dear reviewer, please read carefully:
	- The following routes are just for testing purposes.
	- On a production app each route should have its own module(if applicable), controller and service.
	- The goal of this code is to provide routes for the custom-made rate limiter middleware.
	*/

  //Public routes
  //Has a weight of 5
  @Get('products')
  async getProductsList(): Promise<Product[]> {
    return await this.appService.getProductsList();
  }

  //Has a weight of 2
  @Get('products/:id')
  async getProductById(@Param() params): Promise<Product> {
    return await this.appService.getProductById(params.id);
  }

  //Has a weight of 1
  @Get('products/:id/reviews')
  getProductReviews(): string {
    return this.appService.getProductReviews();
  }

  //Private routes

  //Has a weight of 5
  @Get('couriers')
  getCouriersList(): Promise<Courier[]> {
    return this.appService.getCouriersList();
  }

  //Has a weight of 2
  @Get('couriers/:id')
  async getCourierById(@Param() params): Promise<Courier> {
    return await this.appService.getCourierById(params.id);
  }

  //Has a weight of 1
  @Get('user/:id')
  getUserById(): string {
    return this.appService.getUserById();
  }

  //Flush all keys -- for testing purposes
  @Get('flushall')
  flushall(): string {
    this.redisService.flushall();
    return 'flushall';
  }
}
