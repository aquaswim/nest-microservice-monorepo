import { Module } from '@nestjs/common';
import { SharedlibModule } from '@app/sharedlib';
import { ConfigModule, ConfigService } from '@app/sharedlib/config';
import { APP_FILTER } from '@nestjs/core';
import {
  AllExceptionsFilter,
  AppErrorFiltersProviders,
  TypeormErrorFiltersProviders,
} from '@app/sharedlib/microservice-filters';
import { UsersModule } from './users/users.module';
import { DbModule } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { createPrivateKey, createPublicKey } from 'crypto';

@Module({
  imports: [
    SharedlibModule,
    ConfigModule.forRoot({ prefix: 'USER', global: true }),
    DbModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const privateKeyStr = cfg.get<string>('JWT_PRIVATE_KEY', '');
        if (!privateKeyStr) {
          throw new Error('JWT_PRIVATE_KEY must be provided!');
        }
        const privateKey = createPrivateKey(privateKeyStr);
        const publicKey = createPublicKey(privateKey);

        return {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: {
            algorithm: 'RS256',
            expiresIn: cfg.get<`${number}m`>('JWT_EXPIRE', '10m'),
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ...AppErrorFiltersProviders,
    ...TypeormErrorFiltersProviders,
  ],
})
export class UserModule {}
