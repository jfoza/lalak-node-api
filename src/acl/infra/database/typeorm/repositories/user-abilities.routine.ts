import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypeormAbilityMapper } from '@/acl/infra/database/typeorm/mappers/typeorm-ability.mapper';
import { Ability } from '@/acl/domain/entities/ability';
import { IUserAbilitiesRoutine } from '@/acl/domain/repositories/user-abilities.routine.interface';

@Injectable()
export class UserAbilitiesRoutine implements IUserAbilitiesRoutine {
  constructor(private readonly dataSource: DataSource) {}

  async find(userUuid: string): Promise<Ability[]> {
    const query = `SELECT description, subject, action FROM user_schema.get_user_abilities($1)`;

    const results = await this.dataSource.query(query, [userUuid]);

    return TypeormAbilityMapper.toDomain.collection(results);
  }
}
