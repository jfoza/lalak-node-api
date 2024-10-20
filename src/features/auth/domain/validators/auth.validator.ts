import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { AuthProps } from '@/features/auth/domain/core/auth';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';
import { AuthTypesEnum } from '@/common/infra/enums/auth-types.enum';

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
  @IsEnum(AuthTypesEnum, {
    message: 'The auth field must be a valid type.',
  })
  authType: AuthTypesEnum;

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
