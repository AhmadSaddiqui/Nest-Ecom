// src/sellers/sellers.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/roles.enum';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

@Controller('sellers')
//@UseGuards(RolesGuard)
export class SellersController {
  constructor(private readonly sellersService: SellersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createSellerDto: CreateSellerDto) {
    console.log("=======1")

    return this.sellersService.create(createSellerDto);
  }
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get()
  //@Roles(Role.Admin) 
  async findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  //@Roles(Role.Admin, Role.Seller) 
  async findOne(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Put(':id')
  //@Roles(Role.Admin) 
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  //@Roles(Role.Admin) 
  async delete(@Param('id') id: string) {
    return this.sellersService.delete(id);
  }
}

