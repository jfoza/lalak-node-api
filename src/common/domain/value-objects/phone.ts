import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';

export class Phone extends SimpleValueObject<string> {
  private constructor(private readonly phone: string) {
    super();
  }

  toValue(): string {
    return this.phone;
  }

  static create(phone: string): Phone {
    return new this(phone);
  }

  static createFrom(phone: string): Phone {
    let phoneAux = Helper.removeSpecialCharacters(phone);
    phoneAux = Helper.removeAllSpaces(phoneAux);
    return new this(Helper.removeSpecialCharacters(phoneAux));
  }
}
