import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';

export class Name extends SimpleValueObject<string> {
  protected value: string;

  private constructor(value: string) {
    super();

    this.value = value;
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
