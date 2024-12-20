import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedlibModule } from '@app/sharedlib';

@Module({
  imports: [SharedlibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
