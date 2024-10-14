import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { CityProps } from '@/features/city/domain/core/City';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';

export class CityRules {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(BrazilianStates, {
    message: 'The state field must be a valid Brazilian state',
  })
  uf: BrazilianStates;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ description, uf, active, createdAt }: CityProps) {
    Object.assign(this, {
      description,
      uf,
      active,
      createdAt,
    });
  }
}

export class CityValidator implements IValidator<CityProps> {
  async validate(props: CityProps): Promise<void> {
    const rules = new CityRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class CityValidatorFactory {
  static create(): CityValidator {
    return new CityValidator();
  }
}
