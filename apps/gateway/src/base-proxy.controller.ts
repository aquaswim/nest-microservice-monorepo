import { ClientProxyFactory } from '@nestjs/microservices';
import {
  ExpressReq,
  ExpressResp,
  MicroserviceRequestDto,
  MicroserviceResponseDto,
} from '@app/sharedlib/microservice-dto';
import { firstValueFrom } from 'rxjs';

export abstract class BaseProxyController {
  protected constructor(
    protected client: ReturnType<typeof ClientProxyFactory.create>,
  ) {}

  protected async proxyRequest(
    pattern: string,
    req: ExpressReq,
    res: ExpressResp,
  ) {
    const result = await firstValueFrom<MicroserviceResponseDto>(
      this.client.send(pattern, MicroserviceRequestDto.fromExpress(req)),
    );
    return MicroserviceResponseDto.outToExpress(res, result);
  }
}
