import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseFormatInterceptor,
} from '@app/sharedlib/microservice-dto';

@Controller()
@UseInterceptors(MicroserviceResponseFormatInterceptor)
export class EchoController {
  constructor() {}

  @MessagePattern('echo.echo')
  echo(@MicroserviceRequest() req: MicroserviceRequestDto) {
    return req;
  }
}
