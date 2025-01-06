import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

export class ZipCode extends SimpleValueObject<string> {
  private constructor(private readonly zip: string) {
    super();
  }

  toValue(): string {
    return this.zip;
  }

  static create(zip: string): ZipCode {
    return new this(zip);
  }

  static createFrom(zip: string): ZipCode {
    const zipAux: string = Helper.removeSpecialCharacters(zip);

    if (zipAux.length !== 8) {
      throw new EntityValidationException(['Invalid zip code']);
    }

    return new this(zipAux);
  }
}
