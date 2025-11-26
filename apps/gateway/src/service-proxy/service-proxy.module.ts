import { Module } from '@nestjs/common';
import { SampleController } from './sample/sample.controller';
import { SampleTaskResourceController } from './sample/sample-task-resource.controller';

@Module({
  controllers: [SampleController, SampleTaskResourceController],
})
export class ServiceProxyModule {}
