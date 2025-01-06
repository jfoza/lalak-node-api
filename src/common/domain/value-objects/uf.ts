import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

export class Uf extends SimpleValueObject<string> {
  private constructor(private readonly value: string) {
    super();
  }

  toValue(): string {
    return this.value;
  }

  static create(value: string): Uf {
    return new this(value);
  }

  static createFrom(value: string): Uf {
    if (!(value in BrazilianStates)) {
      throw new EntityValidationException(['Invalid state abbreviation']);
    }
    return new this(value);
  }
}
