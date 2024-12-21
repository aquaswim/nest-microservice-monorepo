import { Controller } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib';
import { SumBodyDto } from './dto/sum.dto';

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @MessagePattern('math.sum')
  async sum(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const body = await req.getAndValidateBody(SumBodyDto);
    return new MicroserviceResponseDto(
      {
        input: body,
        sum: this.mathService.sum(body.numbers),
      },
      200,
    );
  }
}
