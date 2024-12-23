import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  HttpException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  IMicroserviceResponseDto,
  MicroserviceResponseDto,
} from '@app/sharedlib/microservice-dto';

@Catch()
export class AllFilter extends BaseExceptionFilter {
  log = new Logger(this.constructor.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // const httpArgs = host.switchToHttp();
    this.log.error(`[CatchAll] error: ${JSON.stringify(exception)}`);
    if ((exception as IMicroserviceResponseDto).MicroserviceResponseDto) {
      const resDto = exception as IMicroserviceResponseDto;
      // handle MicroserviceResponseDTO
      return super.catch(
        new HttpException(
          MicroserviceResponseDto.formatBody(resDto),
          resDto.code,
        ),
        host,
      );
    }
    const fmtErr = new BadGatewayException(
      { message: 'unexpected error when calling upstream service' },
      { cause: exception },
    );
    return super.catch(fmtErr, host);
  }
}
