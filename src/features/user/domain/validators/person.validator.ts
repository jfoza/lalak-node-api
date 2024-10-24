import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  validate,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { PersonProps } from '@/features/user/domain/core/person';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';

export class PersonRules {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'The birthDate field must be in the format yyyy-mm-dd',
  })
  birthDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10,11}$/, {
    message: 'The phone field must contain 10 to 11 digits',
  })
  phone: string;

  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'The zipCode field must be exactly 8 digits' })
  zipCode: string;

  @IsOptional()
  @IsEnum(BrazilianStates, {
    message: 'The state field must be a valid Brazilian state',
  })
  uf: BrazilianStates;

  @IsOptional()
  @IsUUID()
  cityUuid: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    name,
    shortName,
    birthDate,
    phone,
    zipCode,
    address,
    numberAddress,
    complement,
    district,
    uf,
    cityUuid,
    active,
    createdAt,
  }: PersonProps) {
    Object.assign(this, {
      name,
      shortName,
      birthDate,
      phone,
      zipCode,
      address,
      numberAddress,
      complement,
      district,
      uf,
      cityUuid,
      active,
      createdAt,
    });
  }
}

export class PersonValidator implements IValidator<PersonProps> {
  async validate(props: PersonProps): Promise<void> {
    const rules = new PersonRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class PersonValidatorFactory {
  static create(): PersonValidator {
    return new PersonValidator();
  }
}
