import {
  Controller,
  Inject,
  Request,
  RequestMapping,
  RequestMethod,
  Response,
} from '@nestjs/common';
import type { Request as ExpressReq, Response as ExpressResp } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'node:crypto';
import {
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib/microservice-dto';

export const microserviceProxyControllerBuilder = (clientNameToken: string) => {
  @Controller()
  class MicroserviceProxyController {
    constructor(@Inject(clientNameToken) readonly client: ClientProxy) {}

    // [x: string]: (req: ExpressReq, res: ExpressResp) => unknown;
  }

  const decorateController = (
    controller: any,
    path: string,
    method: RequestMethod,
    pattern: unknown,
  ) => {
    const fnName = 'fn_' + randomUUID().toString().replace(/-/g, '_');
    controller.prototype[fnName] = async function (
      req: ExpressReq,
      res: ExpressResp,
    ) {
      const result = await firstValueFrom<MicroserviceResponseDto>(
        this.client.send(pattern, MicroserviceRequestDto.fromExpressReq(req)),
      );
      return MicroserviceResponseDto.outToExpress(res, result);
    };
    // reference: https://github.com/nestjs/nest/issues/1438#issuecomment-1950300362
    RequestMapping({ path: path, method: method })(
      controller.prototype,
      fnName,
      Object.getOwnPropertyDescriptor(controller.prototype, fnName) as any,
    );
    Request()(controller.prototype, fnName, 0);
    Response()(controller.prototype, fnName, 1);
  };

  const builder = {
    addRoute: (path: string, method: RequestMethod, pattern: unknown) => {
      decorateController(MicroserviceProxyController, path, method, pattern);
      return builder;
    },
    addResource: (pathPrefix: string, patternPrefix: unknown) => {
      builder
        .addRoute(pathPrefix, RequestMethod.GET, `${patternPrefix}.findAll`)
        .addRoute(pathPrefix, RequestMethod.POST, `${patternPrefix}.create`)
        .addRoute(
          `${pathPrefix}/:id`,
          RequestMethod.GET,
          `${patternPrefix}.findOne`,
        )
        .addRoute(
          `${pathPrefix}/:id`,
          RequestMethod.PUT,
          `${patternPrefix}.update`,
        )
        .addRoute(
          `${pathPrefix}/:id`,
          RequestMethod.DELETE,
          `${patternPrefix}.remove`,
        );
      return builder;
    },
    build: () => MicroserviceProxyController,
  };

  return builder;
};
