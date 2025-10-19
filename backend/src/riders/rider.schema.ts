import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RiderDocument = Rider & Document;

@Schema({ timestamps: true })
export class Rider {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  vehicleType: string; // motorcycle, bicycle, car

  @Prop({ required: true, default: 'available' })
  status: string; // available, busy, offline

  @Prop()
  currentLocation?: string;
}

export const RiderSchema = SchemaFactory.createForClass(Rider);
