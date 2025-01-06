import { Inject } from '@nestjs/common';
import { IPolicyAdapter } from '@/acl/application/adapters/policy.adapter.interface';

export abstract class Application {
  @Inject(IPolicyAdapter)
  private policyAdapter: IPolicyAdapter;

  get policy(): IPolicyAdapter {
    return this.policyAdapter;
  }

  set policy(policy: IPolicyAdapter) {
    this.policyAdapter = policy;
  }
}
