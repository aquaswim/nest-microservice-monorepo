import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BaseProxyController } from '../../base-proxy.controller';
import { ConfigService } from '@app/sharedlib/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ExpressReq, ExpressResp } from '@app/sharedlib/microservice-dto';
import { SampleAuthGuard } from '../../sample-auth.guard';

@Controller('tasks')
@UseGuards(SampleAuthGuard)
export class SampleTaskResourceController extends BaseProxyController {
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

  @Post()
  create(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('tasks.create', req, res);
  }

  @Get()
  findAll(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('tasks.findAll', req, res);
  }

  @Get(':id')
  findOne(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('tasks.findOne', req, res);
  }

  @Patch(':id')
  update(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('tasks.update', req, res);
  }

  @Delete(':id')
  remove(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('tasks.remove', req, res);
  }
}
