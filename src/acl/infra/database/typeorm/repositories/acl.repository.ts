import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Ability } from '@/acl/domain/entities/ability';
import { IUserAbilitiesRoutine } from '@/acl/domain/repositories/user-abilities.routine.interface';
import { IRedisRepository } from '@/redis/domain/repositories/redis.repository.interface';
import { CacheEnum } from '@/utils/enums/cache.enum';

@Injectable()
export class AclRepository implements IAclRepository {
  constructor(
    @Inject(IUserAbilitiesRoutine)
    private readonly userAbilitiesRoutine: IUserAbilitiesRoutine,

    @Inject(IRedisRepository)
    private readonly redisRepository: IRedisRepository,
  ) {}

  async findAllByUserUuid(userUuid: string): Promise<Ability[]> {
    return await this.getAbilities(userUuid);
  }

  async findDescriptionByUserUuid(userUuid: string): Promise<string[]> {
    const abilities: Ability[] = await this.getAbilities(userUuid);

    return abilities.map((ability: Ability): string => ability.description);
  }

  private async getAbilities(userUuid: string): Promise<Ability[]> {
    const redisKey: string = CacheEnum.ABILITY_USER(userUuid);

    return await this.redisRepository.remember(
      redisKey,
      async (): Promise<Ability[]> =>
        await this.userAbilitiesRoutine.find(userUuid),
      604800,
    );
  }
}
