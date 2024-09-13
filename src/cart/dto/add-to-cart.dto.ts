// src/cart/dto/add-to-cart.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsString()
  productId: string;

  @IsString()
  sellerId: string;

  @IsNumber()
  quantity: number;
}
