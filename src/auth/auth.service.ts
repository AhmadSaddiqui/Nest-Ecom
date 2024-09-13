// src/auth/auth.service.ts
/*import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    const { email, password, firstName, lastName, username, role } = registerAuthDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const createdUserDto: CreateUserDto = {
      email,
      password, 
      firstName,
      lastName,
      username,
      role,
    };

    const createdUser = await this.usersService.create(createdUserDto);

    return createdUser;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    console.log(`Attempting to log in with email: ${email}`);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      console.log(`User not found with email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log(`Stored password: ${user.password}`);
    console.log(`Entered password: ${password}`);

    // Directly compare stored password with entered password
    if (user.password !== password) {
      console.log(`Password mismatch for user with email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    };

    console.log(`Login successful for email: ${email}`);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}*/
// src/auth/auth.service.ts
// src/auth/auth.service.ts



import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { BuyersService } from 'src/buyers/buyers.service';
import { SellersService } from 'src/sellers/sellers.service';
import { Seller } from 'src/sellers/schemas/seller.schema';
import { Buyer } from 'src/buyers/schemas/buyer.schema';
import { CreateSellerDto } from 'src/sellers/dto/create-seller.dto';
import { CreateBuyerDto } from 'src/buyers/dto/create-buyer.dto';
import { error } from 'console';

/*@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    const { email, password, firstName, lastName, username, role } = registerAuthDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const createdUserDto: CreateUserDto = {
      email,
      password, 
      firstName,
      lastName,
      username,
      role,
    };

    const createdUser = await this.usersService.create(createdUserDto);

    return createdUser;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    console.log(`Attempting to log in with email: ${email}`);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      console.log(`User not found with email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    // Log stored hash and entered password for debugging
    console.log(`Stored password hash: ${user.password}`);
    console.log(`Entered password: ${password}`);

    // Compare entered password with stored hash
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(`Password mismatch for user with email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    };

    console.log(`Login successful for email: ${email}`);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      return user;
    }
    return null;
  }
}
*/
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sellersService: SellersService,
    private readonly buyersService: BuyersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    console.log(`Attempting to log in with email: ${email}`);

    let user: User | Seller | Buyer;
    let userType: string;

    // Try to find the user as a User first
    user = await this.usersService.findByEmail(email);
    userType = 'user';

    // If not found, try finding as a Seller
    if (!user) {
      user = await this.sellersService.findByEmail(email);
      userType = 'seller';
    }

    // If still not found, try finding as a Buyer
    if (!user) {
      user = await this.buyersService.findByEmail(email);
      userType = 'buyer';
    }

    if (!user) {
      console.log(`User not found with email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log(`Stored password hash: ${user.password}`);
    console.log(`Entered password: ${password}`);

    // Validate password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(`Password mismatch for ${userType} with email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: this.getUsername(user),
      role: this.getRole(user),
    };

    console.log(`Login successful for email: ${email}`);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private getUsername(user: User | Seller | Buyer): string {
    if ('username' in user) {
      return user.username as string;
    } else if ('shopName' in user) {
      return user.shopName as string; // Ensure shopName is a string
    } else if ('name' in user) {
      return user.name as string; // Ensure name is a string
    }
    return 'unknown'; // Handle default case
  }

  private getRole(user: User | Seller | Buyer): string {
    if ('role' in user) {
      return user.role as string;
    }
    return 'guest'; // Handle default case or use an appropriate role
  }
  async register(registerAuthDto: RegisterAuthDto): Promise<User | Seller | Buyer> {
    const { email, password, firstName, lastName, username, role } = registerAuthDto;

    // Check if the user already exists
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new ConflictException('Email already in use');
    }

    user = await this.sellersService.findByEmail(email);
    if (user) {
      throw new ConflictException('Email already in use');
    }

    user = await this.buyersService.findByEmail(email);
    if (user) {
      throw new ConflictException('Email already in use');
    }

    // Create new user based on the role
    if (role === 'user') {
      const createdUser = await this.usersService.create({
        email,
        password,
        firstName,
        lastName,
        username,
        role,
      } as CreateUserDto);
      return createdUser;
    } else if (role === 'seller') {
      const createdSeller = await this.sellersService.create({
        email,
        password,
        shopName: username, // Use `shopName` for sellers
      } as CreateSellerDto);
      return createdSeller;
    } else if (role === 'buyer') {
      const createdBuyer = await this.buyersService.create({
        email,
        password,
        name: username, // Use `name` for buyers
      } as CreateBuyerDto);
      return createdBuyer;
    }

    throw new Error('User type not recognized');
  }

  async validateUser(email: string, password: string): Promise<User | Seller | Buyer> {
    
    let user = await this.usersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      return user;
    }

    user = await this.sellersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      return user;
    }

    user = await this.buyersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      return user;
    }

    return null;
  }
}


