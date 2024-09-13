import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Buyer } from './schemas/buyer.schema';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
  ) {}

  async create(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    try {
      const createdBuyer = new this.buyerModel(createBuyerDto);
      return await createdBuyer.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create buyer');
    }
  }

  async findAll(): Promise<Buyer[]> {
    try {
      return await this.buyerModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve buyers');
    }
  }

  async findById(id: string): Promise<Buyer> {
    try {
      const buyer = await this.buyerModel.findById(id).exec();
      if (!buyer) {
        throw new NotFoundException(`Buyer with id ${id} not found`);
      }
      return buyer;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve buyer');
    }
  }

  async update(id: string, updateBuyerDto: UpdateBuyerDto): Promise<Buyer> {
    try {
      const updatedBuyer = await this.buyerModel.findByIdAndUpdate(id, updateBuyerDto, { new: true }).exec();
      if (!updatedBuyer) {
        throw new NotFoundException(`Buyer with id ${id} not found`);
      }
      return updatedBuyer;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update buyer');
    }
  }

  async delete(id: string): Promise<Buyer> {
    try {
      const deletedBuyer = await this.buyerModel.findByIdAndDelete(id).exec();
      if (!deletedBuyer) {
        throw new NotFoundException(`Buyer with id ${id} not found`);
      }
      return deletedBuyer;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete buyer');
    }
  }
  async findByEmail(email: string): Promise<Buyer> {
    const buyer = await this.buyerModel.findOne({ email }).exec();
    if (!buyer) {
      throw new NotFoundException(`Buyer with email ${email} not found`);
    }
    return buyer;
  }
}
