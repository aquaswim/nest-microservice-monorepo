import { All, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@app/sharedlib/config';
import { ExpressReq, ExpressResp } from '@app/sharedlib/microservice-dto';
import { BaseProxyController } from '../../base-proxy.controller';

@Controller('sample')
export class SampleController extends BaseProxyController {
  constructor(config: ConfigService) {
    super(
      ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: config.get<string>('SAMPLE_SERVICE_HOST', 'localhost'),
          port: config.get<number>('SAMPLE_SERVICE_PORT', 3001),
        },
      }),
    );
  }

  @All('echo')
  public async echo(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('echo.echo', req, res);
  }

  @Get('echo/error')
  public async echoError(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('echo.error', req, res);
  }

  @Post('math/sum')
  public async mathSum(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('math.sum', req, res);
  }
}
