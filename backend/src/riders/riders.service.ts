import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rider, RiderDocument } from './rider.schema';

@Injectable()
export class RidersService {
  constructor(@InjectModel(Rider.name) private riderModel: Model<RiderDocument>) {}

  async findAll(): Promise<Rider[]> {
    return this.riderModel.find().exec();
  }

  async findOne(id: string): Promise<Rider> {
    return this.riderModel.findById(id).exec();
  }

  async findAvailable(): Promise<Rider[]> {
    return this.riderModel.find({ status: 'available' }).exec();
  }

  async create(rider: Partial<Rider>): Promise<Rider> {
    const createdRider = new this.riderModel(rider);
    return createdRider.save();
  }

  async updateStatus(id: string, status: string): Promise<Rider> {
    return this.riderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async update(id: string, rider: Partial<Rider>): Promise<Rider> {
    return this.riderModel.findByIdAndUpdate(id, rider, { new: true }).exec();
  }

  async delete(id: string): Promise<Rider> {
    return this.riderModel.findByIdAndDelete(id).exec();
  }
}
