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
  TypeormErrorFiltersProviders,
} from '@app/sharedlib/microservice-filters';
import { DbModule } from '@app/db';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SharedlibModule,
    ConfigModule.forRoot({ prefix: 'SAMPLE', global: true }),
    DbModule.forRoot(),
    MathModule,
    EchoModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ...AppErrorFiltersProviders,
    ...TypeormErrorFiltersProviders,
  ],
})
export class AppModule {}
