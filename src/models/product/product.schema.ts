import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  deleted: Date;

  @Prop()
  deletedBy: string;

  @Prop()
  deletedReason: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
