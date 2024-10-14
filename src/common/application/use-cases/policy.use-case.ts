import { ForbiddenException, Inject } from '@nestjs/common';
import { Policy } from '@/acl/domain/core/policy';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

export abstract class PolicyUseCase {
  @Inject(Policy)
  protected policy: Policy;

  setAbilities(abilities: string[]): void {
    this.policy.setAbilities(abilities);
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
