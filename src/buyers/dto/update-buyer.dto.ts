// src/buyers/dto/update-buyer.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateBuyerDto {
  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
