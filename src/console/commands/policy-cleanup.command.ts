import { Command, CommandRunner } from 'nest-commander';
import { CacheEnum } from '@/common/infra/enums/cache.enum';
import { Inject } from '@nestjs/common';
import { IRedisService } from '@/redis/domain/interfaces/redis.service.interface';

@Command({ name: 'policy:cleanup', description: 'Policy cleanup' })
export class PolicyCleanupCommand extends CommandRunner {
  constructor(
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.redisService.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
    console.log('Policy cleanup performed.');
  }
}
