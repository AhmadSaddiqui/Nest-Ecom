// src/sellers/dto/create-seller.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  shopName: string;

  @IsString()
  @IsOptional()
  shopDescription?: string;

  // Optional: Handle these fields separately if needed
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  username?: string;
}
