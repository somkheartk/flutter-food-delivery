import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './food.schema';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async findAll(): Promise<Food[]> {
    return this.foodModel.find().exec();
  }

  async findByCategory(category: string): Promise<Food[]> {
    return this.foodModel.find({ category }).exec();
  }

  async findOne(id: string): Promise<Food> {
    return this.foodModel.findById(id).exec();
  }

  async create(food: Partial<Food>): Promise<Food> {
    const createdFood = new this.foodModel(food);
    return createdFood.save();
  }

  async update(id: string, food: Partial<Food>): Promise<Food> {
    return this.foodModel.findByIdAndUpdate(id, food, { new: true }).exec();
  }

  async delete(id: string): Promise<Food> {
    return this.foodModel.findByIdAndDelete(id).exec();
  }

  async seedData(): Promise<void> {
    const count = await this.foodModel.countDocuments().exec();
    if (count === 0) {
      const sampleFoods = [
        {
          name: 'Pad Thai',
          description: 'Traditional Thai stir-fried rice noodles',
          price: 120,
          imageUrl: 'https://via.placeholder.com/150',
          category: 'Main Course',
          preparationTime: 20,
        },
        {
          name: 'Tom Yum Soup',
          description: 'Spicy and sour Thai soup',
          price: 90,
          imageUrl: 'https://via.placeholder.com/150',
          category: 'Appetizer',
          preparationTime: 15,
        },
        {
          name: 'Green Curry',
          description: 'Thai green curry with chicken',
          price: 150,
          imageUrl: 'https://via.placeholder.com/150',
          category: 'Main Course',
          preparationTime: 25,
        },
        {
          name: 'Mango Sticky Rice',
          description: 'Sweet mango with sticky rice',
          price: 80,
          imageUrl: 'https://via.placeholder.com/150',
          category: 'Dessert',
          preparationTime: 10,
        },
        {
          name: 'Thai Iced Tea',
          description: 'Sweet and creamy Thai tea',
          price: 50,
          imageUrl: 'https://via.placeholder.com/150',
          category: 'Beverage',
          preparationTime: 5,
        },
      ];
      await this.foodModel.insertMany(sampleFoods);
      console.log('Sample food data seeded successfully');
    }
  }
}
