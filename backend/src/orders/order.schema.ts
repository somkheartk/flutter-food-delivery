import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PREPARING = 'preparing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  PICKED_UP = 'picked_up',
  ON_THE_WAY = 'on_the_way',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

class OrderItem {
  @Prop({ required: true })
  foodId: string;

  @Prop({ required: true })
  foodName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

class PaymentInfo {
  @Prop({ required: true })
  method: string; // cod, online, omise, promptpay

  @Prop({ default: 'pending' })
  status: string; // pending, paid, failed

  @Prop()
  transactionId?: string;

  @Prop()
  paidAt?: Date;
}

class DeliveryInfo {
  @Prop({ required: true })
  address: string;

  @Prop()
  notes?: string;

  @Prop()
  contactPhone?: string;

  @Prop({ type: { type: String, coordinates: [Number] } })
  location?: {
    type: string;
    coordinates: number[];
  };
}

class Timeline {
  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  @Prop()
  notes?: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Merchant', required: true })
  merchantId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Rider' })
  riderId?: MongooseSchema.Types.ObjectId;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  subtotal: number;

  @Prop({ default: 0 })
  deliveryFee: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ type: PaymentInfo, required: true })
  payment: PaymentInfo;

  @Prop({ type: DeliveryInfo, required: true })
  delivery: DeliveryInfo;

  @Prop({ type: [Timeline], default: [] })
  timeline: Timeline[];

  @Prop()
  promoCode?: string;

  @Prop()
  specialInstructions?: string;

  // Keep legacy fields for backward compatibility
  @Prop()
  deliveryAddress?: string;

  @Prop()
  riderName?: string;

  @Prop()
  riderPhone?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Create indexes
OrderSchema.index({ customerId: 1 });
OrderSchema.index({ merchantId: 1 });
OrderSchema.index({ riderId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });
