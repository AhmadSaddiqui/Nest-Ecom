// src/buyers/dto/create-buyer.dto.ts
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBuyerDto {
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsNotEmpty()
  email?: string;
  @IsString()
  @IsNotEmpty()
  password?: string;
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsString()
  @IsNotEmpty()
  username?: string;
  @IsString()
  @IsNotEmpty()
  lastname?: string;
  @IsString()
  @IsNotEmpty()
  firstname?: string;
}

