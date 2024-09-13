// src/cart/dto/create-cart.dto.ts
import { IsString, IsArray } from 'class-validator';

export class CreateCartDto {
  @IsString()
  buyerId: string;

  @IsArray()
  products: { 
    productId: string; 
    sellerId: string;  // Added sellerId
    quantity: number; 
  }[];
}
