import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib';

@Controller()
export class EchoController {
  constructor() {}

  @MessagePattern('echo.echo')
  echo(@MicroserviceRequest() req: MicroserviceRequestDto) {
    return new MicroserviceResponseDto(req, 200);
  }
}
