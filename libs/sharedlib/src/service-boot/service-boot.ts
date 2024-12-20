import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const getPort = (appName: string) => {
  const val = appName ? `${appName.toUpperCase()}_PORT` : 'PORT';
  if (process.env[val]) {
    return parseInt(process.env[val], 10);
  }
  return 3000;
};

export const TCPServiceBoot = (name: string, AppModule: any) => {
  (async () => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      { transport: Transport.TCP, options: { port: getPort(name) } },
    );

    const l = new Logger('Service Boot');

    await app.listen();
    l.log(
      `Service "${name.toUpperCase()}" is listening on port ${getPort(name)}`,
    );
  })().catch((err) => console.error('Error Booting Service', err));
};
