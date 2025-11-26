import { Module } from '@nestjs/common';
import { SharedlibModule } from '@app/sharedlib';
import { APP_FILTER } from '@nestjs/core';
import { AllFilter } from './all.filter';
import { ConfigModule } from '@app/sharedlib/config';
import { ForbiddenFilter } from './forbidden.filter';
import { HealthCheckController } from './health-check/health-check.controller';
import { ServiceProxyModule } from './service-proxy/service-proxy.module';

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
    ServiceProxyModule,
  ],
  controllers: [HealthCheckController],
})
export class GatewayModule {}
