import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { UserTokenProps } from '@/features/user/domain/core/user-token';
import { TokenTypesEnum } from '@/common/infra/enums/token-types.enum';

export class UserTokenRules {
  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @IsUUID()
  token: string;

  @IsNotEmpty()
  @IsEnum(TokenTypesEnum, {
    message: 'The tokenType field must be a valid token type',
  })
  tokenType: TokenTypesEnum;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ userUuid, token, tokenType, createdAt }: UserTokenProps) {
    Object.assign(this, {
      userUuid,
      token,
      tokenType,
      createdAt,
    });
  }
}

export class UserTokenValidator implements IValidator<UserTokenProps> {
  async validate(props: UserTokenProps): Promise<void> {
    const rules = new UserTokenRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class UserTokenValidatorFactory {
  static create(): UserTokenValidator {
    return new UserTokenValidator();
  }
}
