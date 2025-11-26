import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseFormatInterceptor,
} from '@app/sharedlib/microservice-dto';
import { InternalError, ValidationError } from '@app/sharedlib/errors';

@Controller()
@UseInterceptors(MicroserviceResponseFormatInterceptor)
export class EchoController {
  constructor() {}

  @MessagePattern('echo.echo')
  echo(@MicroserviceRequest() req: MicroserviceRequestDto) {
    return req;
  }

  @MessagePattern('echo.error')
  error() {
    if (Math.random() > 0.5) {
      throw new ValidationError();
    }
    throw new InternalError('Dummy Error');
  }
}
