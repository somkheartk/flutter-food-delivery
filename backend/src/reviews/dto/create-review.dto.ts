import { IsNotEmpty, IsString, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { ReviewTarget } from '../review.schema';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(ReviewTarget)
  target: ReviewTarget;

  @IsNotEmpty()
  @IsString()
  targetId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
