import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CourierSeeder } from './database/seeders/couriers.seeder';
import { ProductsSeeder } from './database/seeders/products.seeder';

import { AppClusterService } from './providers/cluster.service';

let seedDataCreated = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!seedDataCreated) {
    // Seed data
    const courierSeeder = app.get(CourierSeeder);
    await courierSeeder.createSeedData();

    const productsSeeder = app.get(ProductsSeeder);
    await productsSeeder.createSeedData();

    seedDataCreated = true;
  }

  await app.listen(3000);
}
AppClusterService.clusterize(bootstrap);
