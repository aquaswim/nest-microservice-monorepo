import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from './entities/apikey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apikeyRepository: Repository<ApiKey>,
  ) {}

  async findKey(apiKey: string): Promise<ApiKey> {
    return this.apikeyRepository.findOneByOrFail({
      key: apiKey,
    });
  }
}
