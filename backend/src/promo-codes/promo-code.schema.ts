import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromoCodeDocument = PromoCode & Document;

export enum PromoCodeType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

@Schema({ timestamps: true })
export class PromoCode {
  @Prop({ required: true, unique: true, uppercase: true })
  code: string;

  @Prop({ required: true, enum: PromoCodeType })
  type: PromoCodeType;

  @Prop({ required: true })
  value: number; // Percentage (e.g., 20 for 20%) or fixed amount

  @Prop({ default: 0 })
  minSpend: number;

  @Prop()
  maxDiscount?: number; // For percentage type

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ default: 0 })
  usageLimit?: number;

  @Prop({ default: 0 })
  usageCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  applicableMerchants: string[]; // Empty array means all merchants

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode);

// Create indexes
PromoCodeSchema.index({ code: 1 });
PromoCodeSchema.index({ isActive: 1 });
PromoCodeSchema.index({ startAt: 1, endAt: 1 });
