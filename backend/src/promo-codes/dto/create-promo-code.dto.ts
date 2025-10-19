import { IsNotEmpty, IsString, IsEnum, IsNumber, IsDate, IsOptional, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PromoCodeType } from '../promo-code.schema';

export class CreatePromoCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(PromoCodeType)
  type: PromoCodeType;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minSpend?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscount?: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startAt: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endAt: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  usageLimit?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  applicableMerchants?: string[];
}
