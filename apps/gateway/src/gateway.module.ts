import { Module, RequestMethod } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { SharedlibModule } from '@app/sharedlib';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { microserviceProxyControllerBuilder } from './microservice-proxy-controller.builder';
import { APP_FILTER } from '@nestjs/core';
import { AllFilter } from './all.filter';
import { ConfigModule, ConfigService } from '@app/sharedlib/config';

@Module({
  providers: [
    GatewayService,
    {
      provide: APP_FILTER,
      useClass: AllFilter,
    },
  ],
  imports: [
    SharedlibModule,
    ConfigModule.forRoot({ prefix: 'GATEWAY', global: true }),
    ClientsModule.registerAsync([
      {
        name: 'SAMPLE_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('SAMPLE_SERVICE_HOST', 'localhost'),
            port: config.get('SAMPLE_SERVICE_PORT', 3001),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [
    GatewayController,
    microserviceProxyControllerBuilder('SAMPLE_SERVICE')
      .addRoute('/coba-sum', RequestMethod.POST, 'math.sum')
      .addRoute('/echo', RequestMethod.ALL, 'echo.echo')
      .addResource('/tasks', 'tasks')
      .build(),
  ],
})
export class GatewayModule {}
