import { Controller, UseInterceptors } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';
import { SumBodyDto } from './dto/sum.dto';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseFormatInterceptor,
} from '@app/sharedlib/microservice-dto';

@Controller()
@UseInterceptors(MicroserviceResponseFormatInterceptor)
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @MessagePattern('math.sum')
  async sum(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const body = await req.getAndValidateBody(SumBodyDto);
    return {
      input: body,
      sum: this.mathService.sum(body.numbers),
    };
  }
}
