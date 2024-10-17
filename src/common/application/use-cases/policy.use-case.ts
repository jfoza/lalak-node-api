import { ForbiddenException, Inject } from '@nestjs/common';
import { Policy } from '@/acl/domain/core/policy';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

export abstract class PolicyUseCase {
  @Inject(Policy)
  private _policy: Policy;

  get policy(): Policy {
    return this._policy;
  }

  set policy(policy: Policy) {
    this._policy = policy;
  }

  protected profileHierarchyValidation(
    needle: string,
    haystack: string[],
    message: string = null,
  ): void {
    if (!haystack.includes(needle)) {
      throw new ForbiddenException(
        message || ErrorMessagesEnum.USER_NOT_ALLOWED,
      );
    }
  }
}
