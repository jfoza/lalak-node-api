import { ForbiddenException, Inject } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { IAclService } from '@/acl/domain/services/acl.service.interface';

export abstract class Application {
  @Inject(IAclService)
  private _aclService: IAclService;

  get policy(): IAclService {
    return this._aclService;
  }

  set policy(aclService: IAclService) {
    this._aclService = aclService;
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
