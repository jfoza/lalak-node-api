import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

export class BirthDate extends SimpleValueObject<Date> {
  private constructor(private readonly value: Date) {
    super();
  }

  toString(): string | null {
    if (!this.value) {
      return null;
    }

    const year = this.value.getUTCFullYear();
    const month = String(this.value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(this.value.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toValue(): Date {
    return this.value;
  }

  static create(birthDate: Date): BirthDate {
    return new this(birthDate);
  }

  static createFrom(birthDate: Date): BirthDate {
    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
      throw new EntityValidationException(['Invalid date']);
    }
    return new this(birthDate);
  }
}
