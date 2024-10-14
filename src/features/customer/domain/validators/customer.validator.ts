import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { CustomerProps } from '@/features/customer/domain/core/customer';

export class CustomerRules {
  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @IsBoolean()
  verifiedEmail: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ userUuid, verifiedEmail, createdAt }: CustomerProps) {
    Object.assign(this, {
      userUuid,
      verifiedEmail,
      createdAt,
    });
  }
}

export class CustomerValidator implements IValidator<CustomerProps> {
  async validate(props: CustomerProps): Promise<void> {
    const rules = new CustomerRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class CustomerValidatorFactory {
  static create(): CustomerValidator {
    return new CustomerValidator();
  }
}
