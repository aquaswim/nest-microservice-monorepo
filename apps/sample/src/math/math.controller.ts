import { Controller } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib';

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @MessagePattern('math.sum')
  async sum(req: MicroserviceRequestDto) {
    let numbers: number[] = [];
    if (req.body?.numbers) {
      numbers = [...req.body.numbers];
    }
    return new MicroserviceResponseDto(
      {
        input: numbers,
        sum: this.mathService.sum(numbers),
      },
      200,
    );
  }
}
