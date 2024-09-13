// src/sellers/dto/update-seller.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateSellerDto {
  @IsString()
  @IsOptional()
  shopName?: string;

  @IsString()
  @IsOptional()
  shopDescription?: string;
}
