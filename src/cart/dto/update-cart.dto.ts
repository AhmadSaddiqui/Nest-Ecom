// src/cart/dto/update-cart.dto.ts
import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto {
  @IsString()
  @IsOptional()
  buyerId?: string;

  @IsArray()
  @IsOptional()
  products?: { 
    productId: string; 
    sellerId: string;  // Added sellerId
    quantity: number; 
  }[];
}
