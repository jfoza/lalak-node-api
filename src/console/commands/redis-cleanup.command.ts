import { Command, CommandRunner } from 'nest-commander';
import { Inject } from '@nestjs/common';
import { IRedisService } from '@/redis/domain/interfaces/redis.service.interface';

@Command({ name: 'redis:cleanup', description: 'Redis cleanup' })
export class RedisCleanupCommand extends CommandRunner {
  constructor(
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.redisService.flush();
    console.log('Redis cleanup performed.');
  }
}
