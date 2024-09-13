// src/users/dto/update-user.dto.ts
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
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

  @IsEnum(['Admin', 'Seller', 'Buyer'])
  @IsOptional()
  role?: 'Admin' | 'Seller' | 'Buyer';
}
