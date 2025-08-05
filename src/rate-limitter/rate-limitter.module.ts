import { Module } from '@nestjs/common';
import { RateLimitterService } from './rate-limitter.service';

@Module({
  providers: [RateLimitterService]
})
export class RateLimitterModule {}
