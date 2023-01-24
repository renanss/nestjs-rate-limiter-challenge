import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourierDocument = HydratedDocument<Courier>;

@Schema()
export class Courier {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export const CourierSchema = SchemaFactory.createForClass(Courier);
