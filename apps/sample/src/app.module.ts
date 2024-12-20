import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedlibModule } from '@app/sharedlib';
import { MathModule } from './math/math.module';

@Module({
  imports: [SharedlibModule, MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
