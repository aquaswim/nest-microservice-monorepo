import {
  Controller,
  Inject,
  Request,
  RequestMapping,
  RequestMethod,
  Response,
  UseGuards,
} from '@nestjs/common';
import type { Request as ExpressReq, Response as ExpressResp } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'node:crypto';
import {
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib/microservice-dto';

type IRouteOptions = Partial<{
  guards: any; // todo: typeOf CanActivate
}>;

export const microserviceProxyControllerBuilder = (clientNameToken: string) => {
  @Controller()
  class MicroserviceProxyController {
    constructor(@Inject(clientNameToken) readonly client: ClientProxy) {}

    // [x: string]: (req: ExpressReq, res: ExpressResp) => unknown;
  }

  const decorateController = (
    controller: typeof MicroserviceProxyController | { [fn_name: string]: any },
    path: string,
    method: RequestMethod,
    pattern: unknown,
    options: IRouteOptions = {},
  ) => {
    const fnName = 'fn_' + randomUUID().toString().replace(/-/g, '_');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    controller.prototype[fnName] = async function (
      req: ExpressReq,
      res: ExpressResp,
    ) {
      const result = await firstValueFrom<MicroserviceResponseDto>(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        this.client.send(pattern, MicroserviceRequestDto.fromExpress(req, res)),
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

    // register guards
    if (options.guards) {
      UseGuards(options.guards)(
        controller.prototype,
        fnName,
        Object.getOwnPropertyDescriptor(controller.prototype, fnName) as any,
      );
    }
  };

  const builder = {
    addRoute: (
      path: string,
      method: RequestMethod,
      pattern: unknown,
      options: IRouteOptions = {},
    ) => {
      decorateController(
        MicroserviceProxyController,
        path,
        method,
        pattern,
        options,
      );
      return builder;
    },
    addResource: (
      pathPrefix: string,
      patternPrefix: string,
      options: IRouteOptions = {},
    ) => {
      builder
        .addRoute(
          pathPrefix,
          RequestMethod.GET,
          `${patternPrefix}.findAll`,
          options,
        )
        .addRoute(
          pathPrefix,
          RequestMethod.GET,
          `${patternPrefix}.findMany`,
          options,
        )
        .addRoute(
          pathPrefix,
          RequestMethod.POST,
          `${patternPrefix}.create`,
          options,
        )
        .addRoute(
          `${pathPrefix}/:id`,
          RequestMethod.GET,
          `${patternPrefix}.findOne`,
          options,
        )
        .addRoute(
          `${pathPrefix}/:id`,
          RequestMethod.PUT,
          `${patternPrefix}.update`,
          options,
        )
        .addRoute(
          `${pathPrefix}/:id`,
          RequestMethod.DELETE,
          `${patternPrefix}.remove`,
          options,
        );
      return builder;
    },
    build: () => MicroserviceProxyController,
  };

  return builder;
};
