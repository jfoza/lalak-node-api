import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { ProfileProps } from '@/features/user/domain/core/profile';

export class ProfileRules {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  uniqueName: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ description, uniqueName, createdAt }: ProfileProps) {
    Object.assign(this, {
      description,
      uniqueName,
      createdAt,
    });
  }
}

export class ProfileValidator implements IValidator<ProfileProps> {
  async validate(props: ProfileProps): Promise<void> {
    const rules = new ProfileRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class ProfileValidatorFactory {
  static create(): ProfileValidator {
    return new ProfileValidator();
  }
}
