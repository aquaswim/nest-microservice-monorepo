import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedlibModule } from '@app/sharedlib';
import { MathModule } from './math/math.module';
import { EchoModule } from './echo/echo.module';
import { ConfigModule } from '@app/sharedlib/config';

@Module({
  imports: [
    SharedlibModule,
    MathModule,
    ConfigModule.forRoot({ prefix: 'SAMPLE' }),
    EchoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
