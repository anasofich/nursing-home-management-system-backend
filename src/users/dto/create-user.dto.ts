import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(UserRole)
  role: UserRole;
}
