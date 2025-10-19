import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MerchantDocument = Merchant & Document;

@Schema({ timestamps: true })
export class Merchant {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  ownerId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };

  @Prop({ default: false })
  isOpen: boolean;

  @Prop({ type: [String], default: [] })
  openHours: string[];

  @Prop({ default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ default: 0 })
  totalReviews: number;

  @Prop()
  imageUrl?: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ default: 0 })
  minimumOrder: number;

  @Prop({ default: 0 })
  deliveryFee: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);

// Create geospatial index for location-based queries
MerchantSchema.index({ location: '2dsphere' });
MerchantSchema.index({ ownerId: 1 });
MerchantSchema.index({ isActive: 1, isOpen: 1 });
