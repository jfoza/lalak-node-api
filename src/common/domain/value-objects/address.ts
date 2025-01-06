import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';

export class Address extends SimpleValueObject<string> {
  private constructor(private readonly address: string) {
    super();
  }

  toValue(): string {
    return this.address;
  }

  static create(address: string): Address {
    return new this(address);
  }

  static createFrom(address: string): Address {
    return new this(Helper.removeSpecialCharacters(address));
  }
}
