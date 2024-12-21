import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllFilter extends BaseExceptionFilter {
  log = new Logger(this.constructor.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // const httpArgs = host.switchToHttp();
    this.log.error(`[CatchAll] error: ${JSON.stringify(exception)}`);
    const fmtErr = new BadGatewayException(
      { message: 'unexpected error when calling upstream service' },
      { cause: exception },
    );
    return super.catch(fmtErr, host);
  }
}
