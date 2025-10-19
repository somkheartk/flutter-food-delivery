import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewTarget } from './review.schema';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get('target/:targetId')
  findByTarget(
    @Param('targetId') targetId: string,
    @Query('type') type: ReviewTarget,
  ) {
    return this.reviewsService.findByTarget(targetId, type);
  }

  @Get('target/:targetId/average')
  getAverageRating(
    @Param('targetId') targetId: string,
    @Query('type') type: ReviewTarget,
  ) {
    return this.reviewsService.getAverageRating(targetId, type);
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.reviewsService.findByOrder(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.reviewsService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
