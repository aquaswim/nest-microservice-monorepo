import { Module } from '@nestjs/common';
import { SharedlibModule } from '@app/sharedlib';
import { ConfigModule } from '@app/sharedlib/config/config.module';
import { APP_FILTER } from '@nestjs/core';
import {
  AllExceptionsFilter,
  AppErrorFiltersProviders,
} from '@app/sharedlib/microservice-filters';
import { DbModule } from '@app/db';

@Module({
  imports: [
    SharedlibModule,
    ConfigModule.forRoot({ prefix: 'USER', global: true }),
    DbModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ...AppErrorFiltersProviders,
  ],
})
export class UserModule {}
