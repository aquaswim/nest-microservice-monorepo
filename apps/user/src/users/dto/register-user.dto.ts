import { IsEmail, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @Optional()
  @IsString()
  lastName: string;
}
