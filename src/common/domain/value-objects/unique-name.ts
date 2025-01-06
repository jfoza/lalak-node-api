import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Helper } from '@/utils/helpers';

export class UniqueName extends SimpleValueObject<string> {
  private constructor(private readonly value: string) {
    super();
  }

  toValue(): string {
    return this.value;
  }

  static create(value: string): UniqueName {
    return new this(value);
  }

  static createFrom(value: string): UniqueName {
    return new this(Helper.stringUniqueName(value));
  }
}
