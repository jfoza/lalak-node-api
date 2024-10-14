import { Mapper } from '@/common/infra/database/typeorm/Mapper';
import { RuleEntity } from '@/acl/infra/database/typeorm/entities/rule.entity';
import { Rule, RuleProps } from '@/acl/domain/core/rule';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RuleMapper extends Mapper<RuleEntity, Rule, RuleProps> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: RuleProps,
    uuid: string,
  ): Promise<Rule> {
    return Rule.create(props, uuid);
  }
}
