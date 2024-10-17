import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  validate,
} from 'class-validator';
import { UserProps } from '@/features/user/domain/core/user';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

export class UserRules {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  personUuid: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  profileUuid: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  @IsEmail()
  email: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    personUuid,
    profileUuid,
    email,
    password,
    active,
    createdAt,
  }: UserProps) {
    Object.assign(this, {
      personUuid,
      profileUuid,
      email,
      password,
      active,
      createdAt,
    });
  }
}

export class UserValidator implements IValidator<UserProps> {
  async validate(props: UserProps): Promise<void> {
    const rules = new UserRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
