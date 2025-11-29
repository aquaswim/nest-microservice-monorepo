import { Module } from '@nestjs/common';
import { SampleController } from './sample/sample.controller';
import { SampleTaskResourceController } from './sample/sample-task-resource.controller';
import { UserController } from './user/user.controller';

@Module({
  controllers: [SampleController, SampleTaskResourceController, UserController],
})
export class ServiceProxyModule {}
