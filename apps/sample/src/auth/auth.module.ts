import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/apikey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
