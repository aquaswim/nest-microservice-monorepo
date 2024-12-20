import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('SAMPLE_SERVICE') private sampleSvcClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Get('/sample')
  callSampleService() {
    return this.sampleSvcClient.send({ cmd: 'sum' }, [1, 2, 3, 4, 5]);
  }
}
