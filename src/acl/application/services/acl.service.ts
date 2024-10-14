import { Inject, Injectable } from '@nestjs/common';
import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { CacheEnum } from '@/common/infra/enums/cache.enum';
import { IAclRepository } from '@/acl/domain/interfaces/acl.repository.interface';
import { IRedisService } from '@/redis/domain/interfaces/redis.service.interface';

@Injectable()
export class AclService {
  constructor(
    @Inject('IAclRepository')
    private readonly aclRepository: IAclRepository,

    @Inject(JwtInfoService)
    private readonly jwtInfoService: JwtInfoService,

    @Inject('IRedisService')
    private readonly redis: IRedisService,
  ) {}

  async handle(): Promise<string[]> {
    if (!this.jwtInfoService.getUser()) {
      return [];
    }

    const userUuid = this.jwtInfoService.getUser().uuid;

    let rules: string[];

    if (userUuid) {
      const redisKey: string = CacheEnum.ABILITY_USER(userUuid);

      rules = await this.redis.remember(
        redisKey,
        () => this.aclRepository.getUserRuleDescriptions(userUuid),
        604800,
      );
    }

    return rules;
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.invalidate(CacheEnum.ABILITY_USER(userId));
  }

  async invalidateAll(): Promise<void> {
    await this.redis.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
  }
}
