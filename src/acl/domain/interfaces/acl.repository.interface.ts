import { Rule } from '@/acl/domain/core/rule';

export interface IAclRepository {
  findAllByUserId(userUuid: string): Promise<Rule[]>;
  getUserRuleDescriptions(userUuid: string): Promise<string[]>;
}
