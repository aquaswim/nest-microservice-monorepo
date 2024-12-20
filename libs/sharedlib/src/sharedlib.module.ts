import { Module } from '@nestjs/common';
import { SharedlibService } from './sharedlib.service';

@Module({
  providers: [SharedlibService],
  exports: [SharedlibService],
})
export class SharedlibModule {}
