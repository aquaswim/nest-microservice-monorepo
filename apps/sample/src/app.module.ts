import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedlibModule } from '@app/sharedlib';
import { MathModule } from './math/math.module';
import { EchoModule } from './echo/echo.module';
import { ConfigModule } from '@app/sharedlib/config';
import { APP_FILTER } from '@nestjs/core';
import {
  AllExceptionsFilter,
  AppErrorFiltersProviders,
} from '@app/sharedlib/microservice-filters';

@Module({
  imports: [
    SharedlibModule,
    MathModule,
    ConfigModule.forRoot({ prefix: 'SAMPLE' }),
    EchoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ...AppErrorFiltersProviders,
  ],
})
export class AppModule {}
