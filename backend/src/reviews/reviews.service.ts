import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument, ReviewTarget } from './review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    // Check if review already exists for this order and target
    const existingReview = await this.reviewModel.findOne({
      orderId: createReviewDto.orderId,
      target: createReviewDto.target,
    }).exec();

    if (existingReview) {
      throw new BadRequestException('Review already exists for this order and target');
    }

    const review = new this.reviewModel(createReviewDto);
    return review.save();
  }

  async findByTarget(targetId: string, target: ReviewTarget): Promise<Review[]> {
    return this.reviewModel.find({ targetId, target }).exec();
  }

  async getAverageRating(targetId: string, target: ReviewTarget): Promise<{ average: number; count: number }> {
    const result = await this.reviewModel.aggregate([
      { $match: { targetId: targetId, target } },
      { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);

    if (result.length === 0) {
      return { average: 0, count: 0 };
    }

    return { average: Math.round(result[0].average * 10) / 10, count: result[0].count };
  }

  async findByOrder(orderId: string): Promise<Review[]> {
    return this.reviewModel.find({ orderId }).exec();
  }

  async findByUser(userId: string): Promise<Review[]> {
    return this.reviewModel.find({ userId }).exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Review not found');
    }
  }
}
