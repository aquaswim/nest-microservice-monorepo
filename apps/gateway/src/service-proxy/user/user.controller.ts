import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { BaseProxyController } from '../../base-proxy.controller';
import { ConfigService } from '@app/sharedlib/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ExpressReq, ExpressResp } from '@app/sharedlib/microservice-dto';
import { UserAuthGuard } from '../../user-auth.guard';

@Controller('users')
export class UserController extends BaseProxyController {
  constructor(config: ConfigService) {
    super(
      ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: config.get<string>('USER_SERVICE_HOST', 'localhost'),
          port: config.get<number>('USER_SERVICE_PORT', 3002),
        },
      }),
    );
  }

  @Post('register')
  register(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('users.register', req, res);
  }

  @Post('login')
  login(@Req() req: ExpressReq, @Res() res: ExpressResp) {
    return this.proxyRequest('users.login', req, res);
  }

  @Get('me')
  @UseGuards(UserAuthGuard)
  me(@Res() res: ExpressResp, @Session() session: unknown) {
    return res.json({ session: session });
  }
}
