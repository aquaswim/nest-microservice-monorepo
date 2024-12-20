import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { IParam } from '@app/sharedlib/config/param.interface';

@Module({})
export class ConfigModule {
  static forRoot(param: IParam): DynamicModule {
    return {
      imports: [NestConfigModule.forRoot()],
      exports: [ConfigService],
      module: ConfigModule,
      providers: [{ provide: 'CONFIG_PARAMS', useValue: param }, ConfigService],
      global: param.global,
    };
  }
}
