import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { AuthProps } from '@/features/auth/domain/core/Auth';

export class AuthRules {
  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @IsDate()
  initialDate: Date;

  @IsNotEmpty()
  @IsDate()
  finalDate: Date;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  ipAddress: string;

  @IsNotEmpty()
  @IsString()
  authType: string;

  @IsNotEmpty()
  @IsBoolean()
  active: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    userUuid,
    initialDate,
    finalDate,
    token,
    ipAddress,
    authType,
    active,
    createdAt,
  }: AuthProps) {
    Object.assign(this, {
      userUuid,
      initialDate,
      finalDate,
      token,
      ipAddress,
      authType,
      active,
      createdAt,
    });
  }
}

export class AuthValidator implements IValidator<AuthProps> {
  async validate(props: AuthProps): Promise<void> {
    const rules = new AuthRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class AuthValidatorFactory {
  static create(): AuthValidator {
    return new AuthValidator();
  }
}
