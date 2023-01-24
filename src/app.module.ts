import { ConfigModule } from '@nestjs/config';
import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { CouriersModule } from './models/courier/courier.module';
import { ProductModule } from './models/product/product.module';

import { AuthMiddleware } from './common/middlewares/auth/auth.middleware';
import { ClusterInfoMiddleware } from './common/middlewares/cluster-info/cluster-info.middleware';
import { RateLimiterMiddleware } from './common/middlewares/rate-limiter/rate-limiter.middleware';
import { RedisService } from './providers/cache/redis/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://mongo:27017',
      }),
    }),
    DatabaseModule,
    CouriersModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule implements NestModule {
  configure(consumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('couriers', 'couriers/:id', 'user/:id');
    consumer
      .apply(ClusterInfoMiddleware, RateLimiterMiddleware)
      .forRoutes(
        'couriers',
        'couriers/:id',
        'products',
        'products/:id',
        'products/:id/reviews',
        'user/:id',
      );
  }
}
