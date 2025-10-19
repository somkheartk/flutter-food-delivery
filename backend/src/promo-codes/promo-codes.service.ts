import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromoCode, PromoCodeDocument } from './promo-code.schema';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectModel(PromoCode.name) private promoCodeModel: Model<PromoCodeDocument>,
  ) {}

  async create(createPromoCodeDto: CreatePromoCodeDto): Promise<PromoCode> {
    const promoCode = new this.promoCodeModel({
      ...createPromoCodeDto,
      code: createPromoCodeDto.code.toUpperCase(),
    });
    return promoCode.save();
  }

  async findAll(): Promise<PromoCode[]> {
    return this.promoCodeModel.find().exec();
  }

  async findActive(): Promise<PromoCode[]> {
    const now = new Date();
    return this.promoCodeModel.find({
      isActive: true,
      startAt: { $lte: now },
      endAt: { $gte: now },
    }).exec();
  }

  async findByCode(code: string): Promise<PromoCode> {
    const promoCode = await this.promoCodeModel.findOne({ code: code.toUpperCase() }).exec();
    if (!promoCode) {
      throw new NotFoundException('Promo code not found');
    }
    return promoCode;
  }

  async validatePromoCode(code: string, orderAmount: number, merchantId?: string): Promise<PromoCode> {
    const promoCode = await this.findByCode(code);
    const now = new Date();

    if (!promoCode.isActive) {
      throw new BadRequestException('This promo code is not active');
    }

    if (promoCode.startAt > now) {
      throw new BadRequestException('This promo code is not yet valid');
    }

    if (promoCode.endAt < now) {
      throw new BadRequestException('This promo code has expired');
    }

    if (promoCode.usageLimit && promoCode.usageCount >= promoCode.usageLimit) {
      throw new BadRequestException('This promo code has reached its usage limit');
    }

    if (orderAmount < promoCode.minSpend) {
      throw new BadRequestException(`Minimum order amount of ${promoCode.minSpend} required`);
    }

    if (promoCode.applicableMerchants.length > 0 && merchantId) {
      if (!promoCode.applicableMerchants.includes(merchantId)) {
        throw new BadRequestException('This promo code is not applicable to this merchant');
      }
    }

    return promoCode;
  }

  async incrementUsage(code: string): Promise<void> {
    await this.promoCodeModel.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usageCount: 1 } },
    ).exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.promoCodeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Promo code not found');
    }
  }
}
