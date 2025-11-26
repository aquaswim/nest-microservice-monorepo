import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
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
    this.log.debug('exception', exception);

    let formattedException: IMicroserviceResponseDto;

    if ((exception as IMicroserviceResponseDto).MicroserviceResponseDto) {
      this.log.error('MicroserviceResponseDto', exception);
      formattedException = exception as IMicroserviceResponseDto;
    } else if (exception instanceof HttpException) {
      this.log.error('HttpException', exception);
      formattedException = new MicroserviceResponseDto(
        { cause: exception.cause },
        exception.getStatus(),
        exception.message,
      );
    } else {
      this.log.error('UnknownError', exception);
      formattedException = new MicroserviceResponseDto(
        undefined,
        502,
        'Bad Gateway',
      );
    }

    return super.catch(
      new HttpException(
        MicroserviceResponseDto.formatBody(formattedException),
        formattedException.code,
      ),
      host,
    );
  }
}
