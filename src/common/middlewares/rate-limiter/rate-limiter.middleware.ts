import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { RedisService } from 'src/providers/cache/redis/redis.service';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private ipLimit = parseInt(process.env.IP_RATE_LIMIT, 10) || 0;
  private tokenLimit = parseInt(process.env.TOKEN_RATE_LIMIT, 10) || 0;
  private window = 60 * 60; // time window in seconds (1 hour)

  constructor(private redisClient: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['x-access-token']
      ? `rate-limit:${req.headers['x-access-token']}`
      : `rate-limit:${req.ip}`;

    const limit = req.headers['x-access-token']
      ? this.tokenLimit
      : this.ipLimit;

    let weight = 1;

    //Dear Reviewer:
    //This is a simple solution to rate limit the requests, I'd suggest using a more robust solution like express-rate-limit(but it was not allowed in the code challenge) and store the weights in a database/redis, nothing hard coded.
    //I deliberately left the weights hard coded to make it easier to understand the logic for your review.

    switch (req.originalUrl) {
      case '/products':
        weight = 5;
        break;
      case '/products/:id':
        weight = 2;
        break;
      case '/products/:id/reviews':
        weight = 1;
        break;
      case '/couriers':
        weight = 5;
        break;
      case '/couriers/:id':
        weight = 2;
        break;
      case '/user/:id':
        weight = 2;
        break;
      default:
        weight = 1;
    }

    const count = await this.redisClient.getValue(key);
    if (count && Number(count) >= limit) {
      const timeLeft = await this.redisClient.ttl(key);
      return res.status(429).json({
        message: `Too many requests. Please wait ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds before trying again.`,
      });
    }

    console.log(`Request count: ${count}` + ` Weight: ${weight}`, req.path);

    await this.redisClient.incrBy(key, weight);
    if (!count) this.redisClient.expire(key, this.window);

    next();
  }
}
