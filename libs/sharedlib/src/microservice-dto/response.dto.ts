import type { Response as ExpressResp } from 'express';

export interface IMicroserviceResponseDto {
  body: unknown;
  code: number;
}

export class MicroserviceResponseDto implements IMicroserviceResponseDto {
  constructor(
    public body: unknown,
    public code: number,
  ) {}

  static outToExpress(res: ExpressResp, dto: IMicroserviceResponseDto) {
    // todo handle if the dto value is not IMicroserviceResponseDto
    return res.status(dto.code).json(dto.body);
  }
}
