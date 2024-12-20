import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, SharedlibModule } from '@app/sharedlib';
import { MathModule } from './math/math.module';
import { EchoModule } from './echo/echo.module';

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
