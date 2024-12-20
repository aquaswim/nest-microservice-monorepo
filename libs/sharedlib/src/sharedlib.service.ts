import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedlibService {
  public sayHello(name: string) {
    return 'Hello World From Sharedlib! Called by ' + name;
  }
}
