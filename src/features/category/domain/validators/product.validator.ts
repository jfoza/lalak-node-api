import {
  IsDate,
  IsNumber,
  IsOptional,
  Min,
  Validate,
  validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IValidator } from '@/common/domain/validators/validator.interface';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { ProductProps } from '@/features/product/domain/core/product';

@ValidatorConstraint({ name: 'isBalanceValid', async: false })
export class IsBalanceValid implements ValidatorConstraintInterface {
  validate(balance: number, args: ValidationArguments) {
    const { quantity } = args.object as any;
    return balance <= quantity;
  }

  defaultMessage() {
    return 'O saldo não pode ser maior que a quantidade.';
  }
}

export class ProductRules {
  @IsNumber()
  @Min(0, { message: 'O valor não pode ser menor que zero.' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'A quantidade não pode ser menor que zero.' })
  quantity: number;

  @IsNumber()
  @Min(0, { message: 'O saldo não pode ser menor que zero.' })
  @Validate(IsBalanceValid)
  balance: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ value, quantity, balance, createdAt }: ProductProps) {
    Object.assign(this, {
      value,
      quantity,
      balance,
      createdAt,
    });
  }
}

export class ProductValidator implements IValidator<ProductProps> {
  async validate(props: ProductProps): Promise<void> {
    const rules = new ProductRules(props);
    const errors = await validate(rules);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => e.toString());
      throw new EntityValidationException(errorMessages);
    }
  }
}

export class ProductValidatorFactory {
  static create(): ProductValidator {
    return new ProductValidator();
  }
}
