import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(process.env.port ?? 3000);
  console.log(`Gateway is listening at address: ${await app.getUrl()}`);
}

bootstrap().catch(console.error);
