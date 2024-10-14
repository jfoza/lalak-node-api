import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { RuleMapper } from '@/acl/infra/database/typeorm/mappers/rule.mapper';
import { Rule } from '@/acl/domain/core/rule';

@Injectable()
export class GetUserRulesRoutine {
  private userUuid: string;

  constructor(
    private readonly dataSource: DataSource,

    @Inject(RuleMapper)
    private readonly ruleMapper: RuleMapper,
  ) {}

  getUserUuid(): string {
    return this.userUuid;
  }

  setUserUuid(value: string): this {
    this.userUuid = value;

    return this;
  }

  async run(): Promise<Rule[]> {
    const query = `SELECT description, subject, action FROM user_schema.get_user_rules($1)`;

    const results = await this.dataSource.query(query, [this.getUserUuid()]);

    return this.ruleMapper.collection(results);
  }
}
