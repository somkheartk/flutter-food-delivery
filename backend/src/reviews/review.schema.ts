import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = Review & Document;

export enum ReviewTarget {
  MERCHANT = 'merchant',
  RIDER = 'rider',
}

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true })
  orderId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: ReviewTarget })
  target: ReviewTarget;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  targetId: MongooseSchema.Types.ObjectId; // merchantId or riderId

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment?: string;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

// Create indexes
ReviewSchema.index({ orderId: 1 });
ReviewSchema.index({ userId: 1 });
ReviewSchema.index({ targetId: 1, target: 1 });
ReviewSchema.index({ rating: 1 });
