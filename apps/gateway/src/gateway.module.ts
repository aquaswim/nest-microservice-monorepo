import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { SharedlibModule } from '@app/sharedlib';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SharedlibModule,
    ClientsModule.register([
      {
        name: 'SAMPLE_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
