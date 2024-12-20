import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { SharedlibModule } from '@app/sharedlib';

@Module({
  imports: [SharedlibModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
