import type { Request as ExpressReq } from 'express';

export interface IMicroserviceRequestDto {
  url: string;
  params: Record<string, string>;
  body: unknown;
  query: unknown;
}

// todo: get and validate body, params, query value
export class MicroserviceRequestDto implements IMicroserviceRequestDto {
  constructor(
    public url: string,
    public params: Record<string, string>,
    public body: unknown,
    public query: unknown,
  ) {}

  static fromExpressReq(req: ExpressReq): MicroserviceRequestDto {
    return new MicroserviceRequestDto(req.url, req.params, req.body, req.query);
  }
}
