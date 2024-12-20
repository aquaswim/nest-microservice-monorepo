import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib';

@Controller()
export class EchoController {
  constructor() {}

  @MessagePattern('echo.echo')
  echo(req: MicroserviceRequestDto) {
    return new MicroserviceResponseDto(req, 200);
  }
}
