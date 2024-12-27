import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { ForbiddenError } from '@app/sharedlib/errors';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.verify')
  async verifyAuth(apiKey: string) {
    try {
      const data = await this.authService.findKey(apiKey);
      return { id: data.name };
    } catch (err) {
      throw new ForbiddenError(String(err));
    }
  }
}
