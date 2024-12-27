import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.verify')
  async verifyAuth(apiKey: string) {
    const data = await this.authService.findKey(apiKey);
    return { id: data.name };
  }
}
