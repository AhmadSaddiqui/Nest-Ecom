// src/sellers/sellers.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './schemas/seller.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    
   
    const existingSeller = await this.sellerModel.findOne({ shopName: createSellerDto.shopName }).exec();
    if (existingSeller) {
      throw new ConflictException('Shop name already in use');
    }

    const createdSeller = new this.sellerModel(createSellerDto);
    console.log('',createdSeller)
    return createdSeller.save();
  

}


  async findAll(): Promise<Seller[]> {
    return this.sellerModel.find().exec();
  }

  async findById(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findById(id).exec();
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const existingSeller = await this.sellerModel.findByIdAndUpdate(id, updateSellerDto, { new: true }).exec();
    if (!existingSeller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return existingSeller;
  }

  async delete(id: string): Promise<void> {
    const result = await this.sellerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
  }
  async findByEmail(email: string): Promise<Seller> {
    const seller = await this.sellerModel.findOne({ email }).exec();
    if (!seller) {
      throw new NotFoundException(`Seller with email ${email} not found`);
    }
    return seller;
  }
}

