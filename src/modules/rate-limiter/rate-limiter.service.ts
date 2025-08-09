import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RateLimiterService {
  private redis = new Redis({
    host: 'localhost',
  });

  async isAllowed(key: string, ttlInSeconds: number): Promise<boolean> {
    const result = await this.redis.set(
      `otp_rate_limit:${key}`,
      '1',
      'EX',
      ttlInSeconds,
      'NX',
    );
    return result === 'OK';
  }
}
