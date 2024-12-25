import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@app/sharedlib/config';
import { ConnectionString } from 'connection-string';

@Module({})
export class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (cfg: ConfigService) => {
            const param = new ConnectionString(cfg.get<string>('DB_CONN', ''));

            return {
              ...param.params,
              type: param.protocol as any,
              host: param.hostname,
              port: param.port,
              username: param.user,
              password: param.password,
              database: (param.path ?? [''])[0],
              autoLoadEntities: true,
            };
          },
        }),
      ],
      providers: [],
      exports: [TypeOrmModule],
    };
  }
}
