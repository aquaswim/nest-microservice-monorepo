import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

@Injectable()
export class SampleAuthGuard implements CanActivate {
  logger = new Logger(SampleAuthGuard.name);

  constructor(
    @Inject('SAMPLE_SERVICE') private readonly sampleClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const res = context.switchToHttp().getResponse<ExpressResponse>();
    if (!req.header('x-api-key')) {
      return false;
    }

    try {
      res.locals.session = await firstValueFrom(
        this.sampleClient.send('auth.verify', req.header('x-api-key')),
      );
    } catch (err) {
      this.logger.error('error at auth.verify', err);
      return false;
    }
    return true;
  }
}
