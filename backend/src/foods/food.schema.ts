import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Merchant' })
  merchantId?: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  preparationTime: number;

  @Prop({ default: true })
  inStock: boolean;

  @Prop({ type: [Object], default: [] })
  options: any[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);

// Create indexes
FoodSchema.index({ merchantId: 1 });
FoodSchema.index({ category: 1 });
FoodSchema.index({ inStock: 1 });
