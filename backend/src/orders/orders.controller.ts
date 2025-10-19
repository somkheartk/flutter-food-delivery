import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  async create(@Body() order: Partial<Order>): Promise<Order> {
    return this.ordersService.create(order);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }

  @Put(':id/assign-rider')
  async assignRider(
    @Param('id') id: string,
    @Body() riderData: { riderId: string; riderName: string; riderPhone: string },
  ): Promise<Order> {
    return this.ordersService.assignRider(id, riderData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Order> {
    return this.ordersService.delete(id);
  }
}
