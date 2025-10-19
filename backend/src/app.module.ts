import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodsModule } from './foods/foods.module';
import { OrdersModule } from './orders/orders.module';
import { RidersModule } from './riders/riders.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/food-delivery', {
      // Add these options for better connection handling
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }),
    FoodsModule,
    OrdersModule,
    RidersModule,
  ],
})
export class AppModule {}
