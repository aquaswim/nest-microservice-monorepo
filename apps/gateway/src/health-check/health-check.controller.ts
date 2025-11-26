import { Controller, Get } from '@nestjs/common';
import { SharedlibService } from '@app/sharedlib';

@Controller('_healthCheck')
export class HealthCheckController {
  constructor(private sharedLib: SharedlibService) {}

  @Get()
  public healthCheck() {
    return this.sharedLib.sayHello('Gateway');
  }
}
