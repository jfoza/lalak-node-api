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
    private readonly redisService: IRedisService,
  ) {}

  async handle(): Promise<string[]> {
    if (!this.jwtInfoService.user) {
      return [];
    }

    const userUuid = this.jwtInfoService.user.uuid;

    let abilities: string[];

    if (userUuid) {
      const redisKey: string = CacheEnum.ABILITY_USER(userUuid);

      abilities = await this.redisService.remember(
        redisKey,
        () => this.aclRepository.getUserAbilityDescriptions(userUuid),
        604800,
      );
    }

    return abilities;
  }

  async invalidate(userId: string): Promise<void> {
    await this.redisService.invalidate(CacheEnum.ABILITY_USER(userId));
  }

  async invalidateAll(): Promise<void> {
    await this.redisService.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
  }
}
