import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { Food } from './food.schema';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  async findAll(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<Food[]> {
    return this.foodsService.findByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Food> {
    return this.foodsService.findOne(id);
  }

  @Post()
  async create(@Body() food: Partial<Food>): Promise<Food> {
    return this.foodsService.create(food);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() food: Partial<Food>,
  ): Promise<Food> {
    return this.foodsService.update(id, food);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Food> {
    return this.foodsService.delete(id);
  }

  @Post('seed')
  async seed(): Promise<{ message: string }> {
    await this.foodsService.seedData();
    return { message: 'Sample data seeded successfully' };
  }
}
