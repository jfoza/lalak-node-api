import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { AbilityMapper } from '@/acl/infra/database/typeorm/mappers/ability.mapper';
import { Ability } from '@/acl/domain/core/ability';

@Injectable()
export class GetUserAbilitiesRoutine {
  private userUuid: string;

  constructor(
    private readonly dataSource: DataSource,

    @Inject(AbilityMapper)
    private readonly abilityMapper: AbilityMapper,
  ) {}

  getUserUuid(): string {
    return this.userUuid;
  }

  setUserUuid(value: string): this {
    this.userUuid = value;

    return this;
  }

  async run(): Promise<Ability[]> {
    const query = `SELECT description, subject, action FROM user_schema.get_user_abilities($1)`;

    const results = await this.dataSource.query(query, [this.getUserUuid()]);

    return this.abilityMapper.collection(results);
  }
}
