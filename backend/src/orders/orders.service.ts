import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async create(order: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async assignRider(
    id: string,
    riderData: { riderId: string; riderName: string; riderPhone: string },
  ): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(
        id,
        {
          riderId: riderData.riderId,
          riderName: riderData.riderName,
          riderPhone: riderData.riderPhone,
          status: 'confirmed',
        },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
