import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';

export class ShortName extends SimpleValueObject<string> {
  private constructor(private readonly shortName: string) {
    super();
  }

  toValue(): string {
    return this.shortName;
  }

  static create(shortName: string): ShortName {
    return new this(shortName);
  }

  static createFrom(shortName: string): ShortName {
    return new this(Helper.shortStringGenerate(shortName));
  }
}
