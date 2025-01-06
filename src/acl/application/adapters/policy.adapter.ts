import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';
import { Injectable } from '@nestjs/common';
import { Policy } from '@/acl/domain/value-objects/policy';
import {
  IPolicyAdapter,
  TPolicyMatch,
} from '@/acl/application/adapters/policy.adapter.interface';

@Injectable()
export class PolicyAdapter implements IPolicyAdapter {
  constructor(private readonly policy: Policy) {}

  toValue(): string[] {
    return this.policy.toValue();
  }

  can(value: string): void {
    if (!this.has(value)) {
      throw new AclForbiddenException();
    }
  }

  has(value: string): boolean {
    return this.toValue().includes(value);
  }

  async match<T>(expressions: TPolicyMatch<T>[]): Promise<T> {
    for (const { has, action } of expressions) {
      if (has === true) {
        return await action();
      }
    }
    throw new AclForbiddenException();
  }
}
