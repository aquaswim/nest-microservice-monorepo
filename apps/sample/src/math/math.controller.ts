import { Controller } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @MessagePattern({ cmd: 'sum' })
  async sum(data: number[]): Promise<number> {
    await sleep(2000);
    return this.mathService.sum(data || []);
  }
}
