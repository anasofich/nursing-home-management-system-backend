import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    console.log('created user', user);
    return this.generateToken(user);
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    console.log('Found user:', user); // Check if user is returned

    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // No user found
    }

    console.log('Comparing passwords...');
    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials'); // Password mismatch
    }

    console.log('Password comparison successful'); // This should log if comparison works

    return this.generateToken(user);
  }

  private generateToken(user) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
}
