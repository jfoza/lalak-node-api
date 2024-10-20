import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { AdminUserProps } from '@/features/user/domain/core/admin-user';

export class AdminUserRules {
  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ userUuid, createdAt }: AdminUserProps) {
    Object.assign(this, {
      userUuid,
      createdAt,
    });
  }
}

export class AdminUserValidator implements IValidator<AdminUserProps> {
  async validate(props: AdminUserProps): Promise<void> {
    const rules = new AdminUserRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class AdminUserValidatorFactory {
  static create(): AdminUserValidator {
    return new AdminUserValidator();
  }
}
