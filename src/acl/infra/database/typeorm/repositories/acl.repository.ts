import { IAclRepository } from '@/acl/domain/interfaces/acl.repository.interface';
import { Rule } from '@/acl/domain/core/rule';
import { GetUserRulesRoutine } from '@/acl/infra/database/typeorm/routines/get-user-rules.routine';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AclRepository implements IAclRepository {
  constructor(private readonly getUserRulesRoutine: GetUserRulesRoutine) {}

  async findAllByUserId(userUuid: string): Promise<Rule[]> {
    return await this.getUserRulesRoutine.setUserUuid(userUuid).run();
  }

  async getUserRuleDescriptions(userUuid: string): Promise<string[]> {
    const results = await this.getUserRulesRoutine.setUserUuid(userUuid).run();

    return results.map((result: { description: string }) => result.description);
  }
}
