import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RidersService } from './riders.service';
import { Rider } from './rider.schema';

@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Get()
  async findAll(): Promise<Rider[]> {
    return this.ridersService.findAll();
  }

  @Get('available')
  async findAvailable(): Promise<Rider[]> {
    return this.ridersService.findAvailable();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rider> {
    return this.ridersService.findOne(id);
  }

  @Post()
  async create(@Body() rider: Partial<Rider>): Promise<Rider> {
    return this.ridersService.create(rider);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Rider> {
    return this.ridersService.updateStatus(id, status);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() rider: Partial<Rider>): Promise<Rider> {
    return this.ridersService.update(id, rider);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Rider> {
    return this.ridersService.delete(id);
  }
}
