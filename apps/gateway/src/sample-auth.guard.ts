import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ExpressReq } from '@app/sharedlib/microservice-dto';
import { ConfigService } from '@app/sharedlib/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class SampleAuthGuard implements CanActivate {
  logger = new Logger(SampleAuthGuard.name);
  private sampleClient: ReturnType<typeof ClientProxyFactory.create>;

  constructor(config: ConfigService) {
    this.sampleClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.get<string>('SAMPLE_SERVICE_HOST', 'localhost'),
        port: config.get<number>('SAMPLE_SERVICE_PORT', 3001),
      },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ExpressReq>();
    if (!req.header('x-api-key')) {
      this.logger.log('missing x-api-key');
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.session = await firstValueFrom(
      this.sampleClient.send('auth.verify', req.header('x-api-key')),
    );
    return true;
  }
}
