// src/buyers/buyers.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async create(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto); // Use AuthService to handle login
  }

  @Get()
  async findAll() {
    return this.buyersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.buyersService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyersService.update(id, updateBuyerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.buyersService.delete(id);
  }
}
