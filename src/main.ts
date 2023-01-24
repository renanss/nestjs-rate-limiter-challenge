import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppClusterService } from './providers/cluster.service';
import { CourierSeeder } from './database/seeders/couriers.seeder';
import { ProductsSeeder } from './database/seeders/products.seeder';

async function bootstrap(isPrimary: boolean) {
  const app = await NestFactory.create(AppModule);

  if (isPrimary) {
    const courierSeeder = app.get(CourierSeeder);
    await courierSeeder.createSeedData();

    const productsSeeder = app.get(ProductsSeeder);
    await productsSeeder.createSeedData();
  } else await app.listen(Number(process.env.PORT) || 3000);
}

AppClusterService.clusterize(bootstrap);
