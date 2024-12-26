import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Ability } from '@/acl/domain/entities/ability';
import { IUserAbilities } from '@/acl/domain/repositories/user-abilities.routine.interface';
import { IRedisRepository } from '@/redis/domain/repositories/redis.repository.interface';
import { CacheEnum } from '@/utils/enums/cache.enum';

@Injectable()
export class AclRepository implements IAclRepository {
  constructor(
    @Inject(IUserAbilities)
    private readonly userAbilitiesRoutine: IUserAbilities,

    @Inject(IRedisRepository)
    private readonly redisRepository: IRedisRepository,
  ) {}

  async findAllByUserUuid(userUuid: string): Promise<Ability[]> {
    const redisKey: string = CacheEnum.ABILITY_USER(userUuid);

    return await this.redisRepository.remember(
      redisKey,
      async (): Promise<Ability[]> =>
        await this.userAbilitiesRoutine.find(userUuid),
      604800,
    );
  }
}
