import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courier, CourierDocument } from './courier.schema';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel(Courier.name) private courierModel: Model<CourierDocument>,
  ) {}

  async getCouriersList(): Promise<Courier[]> {
    return await this.courierModel.find().exec();
  }

  async getCourierById(id: string): Promise<Courier> {
    return await this.courierModel.findById(id).exec();
  }
}
