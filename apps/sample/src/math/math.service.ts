import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  sum(numbers: number[]) {
    return numbers.reduce((acc, x) => acc + x, 0);
  }
}
