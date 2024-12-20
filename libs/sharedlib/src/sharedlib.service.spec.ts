import { Test, TestingModule } from '@nestjs/testing';
import { SharedlibService } from './sharedlib.service';

describe('SharedlibService', () => {
  let service: SharedlibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedlibService],
    }).compile();

    service = module.get<SharedlibService>(SharedlibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
