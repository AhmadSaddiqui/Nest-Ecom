// src/orders/dto/update-order.dto.ts
import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  buyerId?: string;

  @IsString()
  @IsOptional()
  sellerId?: string;

  @IsArray()
  @IsOptional()
  products?: { 
    productId: string; 
    quantity: number; 
  }[];

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
  @IsOptional()
  status?: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
