import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RateLimitterService {
  private redis = new Redis();

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
