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

            const dbType = parseDBType(param.protocol);
            if (!dbType) {
              throw new Error(`Unknown DB TYPE=${dbType}`);
            }

            return {
              ...param.params,
              type: dbType,
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

function parseDBType(type: string | undefined) {
  if (!type) return undefined;
  switch (type.toLowerCase()) {
    case 'mysql':
      return 'mysql';
    case 'postgres':
      return 'postgres';
    case 'sqlite':
      return 'sqlite';
    default:
      return undefined;
  }
}
