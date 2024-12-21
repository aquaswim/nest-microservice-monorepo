import type { Request as ExpressReq } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export interface IMicroserviceRequestDto<TBody = unknown> {
  url: string;
  params: Record<string, string>;
  body: TBody;
  query: unknown;

  // this is typeguard
  readonly MicroserviceRequestDto: boolean;
}

export class MicroserviceRequestDto<TBody = unknown>
  implements IMicroserviceRequestDto<TBody>
{
  MicroserviceRequestDto = true;

  constructor(
    public url: string,
    public params: Record<string, string>,
    public body: TBody,
    public query: unknown,
  ) {}

  static fromExpressReq(req: ExpressReq): MicroserviceRequestDto {
    return new MicroserviceRequestDto(req.url, req.params, req.body, req.query);
  }

  async getAndValidateBody<T = TBody>(type: { new (): T }) {
    // transform to class
    const body = plainToInstance(type, this.body);
    // validate
    const validateRes = await validate(body as object);
    if (validateRes.length > 0) {
      // todo throw something that can be translated by gateway (use filter)
      throw new RpcException(validateRes);
    }
    return body;
  }
}

export const MicroserviceRequest = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const rpcArgs = ctx.switchToRpc();
    const data = rpcArgs.getData<IMicroserviceRequestDto>();
    // check for type guard
    if (!data.MicroserviceRequestDto) {
      // todo throw something that can be translated by gateway (use filter)
      throw new RpcException('Invalid request');
    }
    return new MicroserviceRequestDto(
      data.url,
      data.params,
      data.body,
      data.query,
    );
  },
);
