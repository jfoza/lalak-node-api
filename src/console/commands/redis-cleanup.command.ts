import { Command, CommandRunner } from 'nest-commander';
import { Inject } from '@nestjs/common';
import { IRedisRepository } from '@/redis/domain/repositories/redis.repository.interface';

@Command({ name: 'redis:cleanup', description: 'Redis cleanup' })
export class RedisCleanupCommand extends CommandRunner {
  constructor(
    @Inject(IRedisRepository)
    private readonly redisRepository: IRedisRepository,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.redisRepository.flush();
    console.log('Redis cleanup performed.');
  }
}
