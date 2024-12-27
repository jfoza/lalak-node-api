import { ForbiddenException, Inject } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Policy } from '@/acl/domain/entities/policy';

export abstract class Application {
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
