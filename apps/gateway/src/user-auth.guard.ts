import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@app/sharedlib/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import {
  ExpressReq,
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib/microservice-dto';

@Injectable()
export class UserAuthGuard implements CanActivate {
  private readonly logger = new Logger(UserAuthGuard.name);
  private client: ReturnType<typeof ClientProxyFactory.create>;
  constructor(config: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.get<string>('USER_SERVICE_HOST', 'localhost'),
        port: config.get<number>('USER_SERVICE_PORT', 3002),
      },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ExpressReq>();

    const msReq = MicroserviceRequestDto.fromExpress(req);
    msReq.params['token'] = req.header('authorization') || '';
    if (!msReq.params['token']) {
      return false;
    }

    const result = await firstValueFrom<MicroserviceResponseDto>(
      this.client.send('users.checkAccessToken', msReq),
    );

    req.session = result.data;

    return true;
  }
}
