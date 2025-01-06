import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';

export class Name extends SimpleValueObject<string> {
  private constructor(private readonly value: string) {
    super();
  }

  toValue(): string {
    return this.value;
  }

  static create(value: string): Name {
    return new this(value);
  }

  static createFrom(value: string): Name {
    const valueAux: string = Helper.removeSpecialCharacters(value);
    return new this(Helper.capitalize(valueAux));
  }
}
