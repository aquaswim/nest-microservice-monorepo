import { Module, RequestMethod } from '@nestjs/common';
import { SharedlibModule } from '@app/sharedlib';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { microserviceProxyControllerBuilder } from './microservice-proxy-controller.builder';
import { APP_FILTER } from '@nestjs/core';
import { AllFilter } from './all.filter';
import { ConfigModule, ConfigService } from '@app/sharedlib/config';
import { SampleAuthGuard } from './sample-auth.guard';
import { ForbiddenFilter } from './forbidden.filter';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenFilter,
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
            host: config.get<string>('SAMPLE_SERVICE_HOST', 'localhost'),
            port: config.get<number>('SAMPLE_SERVICE_PORT', 3001),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [
    HealthCheckController,
    microserviceProxyControllerBuilder('SAMPLE_SERVICE')
      .addRoute('/coba-sum', RequestMethod.POST, 'math.sum')
      .addRoute('/echo', RequestMethod.ALL, 'echo.echo', {
        guards: SampleAuthGuard,
      })
      .addResource('/tasks', 'tasks', { guards: SampleAuthGuard })
      .build(),
  ],
})
export class GatewayModule {}
