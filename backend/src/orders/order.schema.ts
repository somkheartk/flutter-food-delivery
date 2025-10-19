import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

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

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true, default: 'pending' })
  status: string; // pending, confirmed, preparing, delivering, completed, cancelled

  @Prop()
  riderId?: string;

  @Prop()
  riderName?: string;

  @Prop()
  riderPhone?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
