import { ExpressResp } from '@app/sharedlib/microservice-dto/express';

export interface IMicroserviceResponseDto {
  readonly MicroserviceResponseDto: boolean;
  data: unknown;
  message?: string;
  code: number;
}

export class MicroserviceResponseDto implements IMicroserviceResponseDto {
  MicroserviceResponseDto = true;

  constructor(
    public data: unknown,
    public code: number,
    public message: string = 'OK',
  ) {}

  static outToExpress(res: ExpressResp, dto: IMicroserviceResponseDto) {
    if (!dto.MicroserviceResponseDto) {
      // handle if the dto value is not IMicroserviceResponseDto
      return res.status(dto.code ?? 500).json(dto);
    }
    return res.status(dto.code).json(this.formatBody(dto));
  }

  static formatBody({ message, data }: IMicroserviceResponseDto) {
    return { message, data };
  }
}
