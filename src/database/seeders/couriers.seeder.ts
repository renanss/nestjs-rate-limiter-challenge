import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Courier, CourierDocument } from '../../models/courier/courier.schema';

@Injectable()
export class CourierSeeder {
  constructor(
    @InjectModel(Courier.name) private courierModel: Model<CourierDocument>,
  ) {}

  async createSeedData() {
    const couriers = [
      await this.courierModel.create({
        name: 'DHL',
        phone: '1800-209-6161',
        email: '',
        created: new Date(),
        updated: new Date(),
      }),
      await this.courierModel.create({
        name: 'FedEx',
        phone: '1800-209-6161',
        email: '',
        created: new Date(),
        updated: new Date(),
      }),
      await this.courierModel.create({
        name: 'Blue Dart',
        phone: '1800-209-6161',
        email: '',
        created: new Date(),
        updated: new Date(),
      }),
      await this.courierModel.create({
        name: 'DTDC',
        phone: '1800-209-6161',
        email: '',
        created: new Date(),
        updated: new Date(),
      }),
      await this.courierModel.create({
        name: 'Ecom Express',
        phone: '1800-209-6161',
        email: '',
        created: new Date(),
        updated: new Date(),
      }),
      await this.courierModel.create({
        name: 'Professional Couriers',
        phone: '1800-209-6161',
        email: '',
        created: new Date(),
        updated: new Date(),
      }),
    ];

    await Promise.all(couriers.map((courier) => courier.save()));
  }
}
