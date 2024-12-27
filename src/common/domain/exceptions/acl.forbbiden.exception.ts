import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';

export class AclForbiddenException extends ForbiddenException {
  constructor() {
    super(ErrorMessagesEnum.NOT_AUTHORIZED);
    this.name = 'AclForbiddenException';
  }
}
