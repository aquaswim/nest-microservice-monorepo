import { Injectable } from '@nestjs/common';
import { SharedlibService } from '@app/sharedlib';

@Injectable()
export class GatewayService {
  constructor(private readonly sharedLib: SharedlibService) {}

  getHello(): string {
    return this.sharedLib.sayHello('Gateway Service');
  }
}
