import { ArrayMinSize, IsArray } from 'class-validator';

export class SumBodyDto {
  @IsArray()
  @ArrayMinSize(1)
  numbers: number[];
}
