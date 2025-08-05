import { Test, TestingModule } from '@nestjs/testing';
import { RateLimitterService } from './rate-limitter.service';

describe('RateLimitterService', () => {
  let service: RateLimitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateLimitterService],
    }).compile();

    service = module.get<RateLimitterService>(RateLimitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
