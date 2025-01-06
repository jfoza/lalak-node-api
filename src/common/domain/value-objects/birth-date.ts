import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

export class BirthDate extends SimpleValueObject<Date> {
  private constructor(private readonly birthDate: Date) {
    super();
  }

  toString(): string {
    const year = this.birthDate.getUTCFullYear();
    const month = String(this.birthDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(this.birthDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toValue(): Date {
    return this.birthDate;
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
