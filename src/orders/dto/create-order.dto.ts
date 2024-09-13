// src/orders/dto/create-order.dto.ts
import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  buyerId: string;

  @IsString()
  sellerId: string;

  @IsArray()
  products: { 
    productId: string; 
    quantity: number; 
  }[];

  @IsNumber()
  totalAmount: number;

  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
