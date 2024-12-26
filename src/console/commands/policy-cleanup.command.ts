import { Command, CommandRunner } from 'nest-commander';
import { CacheEnum } from '@/utils/enums/cache.enum';
import { Inject } from '@nestjs/common';
import { IRedisRepository } from '@/redis/domain/repositories/redis.repository.interface';

@Command({ name: 'policy:cleanup', description: 'Policy cleanup' })
export class PolicyCleanupCommand extends CommandRunner {
  constructor(
    @Inject(IRedisRepository)
    private readonly redisService: IRedisRepository,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.redisService.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
    console.log('Policy cleanup performed.');
  }
}
