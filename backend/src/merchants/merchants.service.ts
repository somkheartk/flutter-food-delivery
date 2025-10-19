import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant, MerchantDocument } from './merchant.schema';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<MerchantDocument>,
  ) {}

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const merchant = new this.merchantModel({
      ...createMerchantDto,
      location: {
        type: 'Point',
        coordinates: [createMerchantDto.longitude, createMerchantDto.latitude],
      },
    });
    return merchant.save();
  }

  async findAll(isActive?: boolean): Promise<Merchant[]> {
    const filter = isActive !== undefined ? { isActive } : {};
    return this.merchantModel.find(filter).exec();
  }

  async findNearby(longitude: number, latitude: number, maxDistance: number = 5000): Promise<Merchant[]> {
    return this.merchantModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance, // in meters
        },
      },
      isActive: true,
    }).exec();
  }

  async findByOwner(ownerId: string): Promise<Merchant[]> {
    return this.merchantModel.find({ ownerId }).exec();
  }

  async findOne(id: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findById(id).exec();
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    return merchant;
  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant> {
    const updateData: any = { ...updateMerchantDto };
    
    if (updateMerchantDto.longitude && updateMerchantDto.latitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [updateMerchantDto.longitude, updateMerchantDto.latitude],
      };
      delete updateData.longitude;
      delete updateData.latitude;
    }

    const merchant = await this.merchantModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).exec();

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    return merchant;
  }

  async updateOpenStatus(id: string, isOpen: boolean): Promise<Merchant> {
    const merchant = await this.merchantModel.findByIdAndUpdate(
      id,
      { $set: { isOpen } },
      { new: true },
    ).exec();

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    return merchant;
  }

  async remove(id: string): Promise<void> {
    const result = await this.merchantModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Merchant not found');
    }
  }
}
