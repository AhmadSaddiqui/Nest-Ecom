// src/buyers/buyers.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from './schemas/buyer.schema';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { AuthModule } from 'src/auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    AuthModule, // Add AuthModule here
  ],
  providers: [BuyersService],
  controllers: [BuyersController],
  exports: [BuyersService],
})
export class BuyersModule {}
