import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { AbilityMapper } from '@/acl/infra/database/typeorm/mappers/ability.mapper';
import { Ability } from '@/acl/domain/entities/ability';
import { IUserAbilities } from '@/acl/domain/repositories/user-abilities.routine.interface';

@Injectable()
export class UserAbilitiesRoutine implements IUserAbilities {
  constructor(
    private readonly dataSource: DataSource,

    @Inject(AbilityMapper)
    private readonly abilityMapper: AbilityMapper,
  ) {}

  async find(userUuid: string): Promise<Ability[]> {
    const query = `SELECT description, subject, action FROM user_schema.get_user_abilities($1)`;

    const results = await this.dataSource.query(query, [userUuid]);

    return this.abilityMapper.collection(results);
  }
}
