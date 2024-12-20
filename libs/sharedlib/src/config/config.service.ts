import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IParam } from '@app/sharedlib/config/param.interface';

@Injectable()
export class ConfigService {
  constructor(
    private readonly config: NestConfigService,
    @Inject('CONFIG_PARAMS') private readonly param: IParam,
  ) {}

  public get<T>(key: string, defaultValue: NoInfer<T>): T | undefined {
    return this.config.get(this.prefixedKey(key), defaultValue);
  }

  private prefixedKey(key: string) {
    return [this.param.prefix, key].join('_');
  }
}
