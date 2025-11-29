import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseFormatInterceptor,
} from '@app/sharedlib/microservice-dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForbiddenError } from '@app/sharedlib/errors';

@Controller()
@UseInterceptors(MicroserviceResponseFormatInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.register')
  async register(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const registerDto = await req.getAndValidateBody(RegisterUserDto);
    return this.usersService.registerUser(registerDto);
  }

  @MessagePattern('users.findByEmail')
  findByEmail(@MicroserviceRequest() req: MicroserviceRequestDto) {
    return this.usersService.findByEmail(req.getParam('email'));
  }

  @MessagePattern('users.login')
  async login(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const loginDto = await req.getAndValidateBody(LoginDto);
    return this.usersService.login(loginDto);
  }

  @MessagePattern('users.checkAccessToken')
  async checkAccessToken(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const token = req.getParam('token');
    if (!token) {
      throw new ForbiddenError('No token provided');
    }

    const [type, tokenValue] = token.split(' ');

    if (type !== 'Bearer' || !tokenValue) {
      throw new ForbiddenError('Invalid token format');
    }

    return this.usersService.checkAccessToken(tokenValue);
  }
}
