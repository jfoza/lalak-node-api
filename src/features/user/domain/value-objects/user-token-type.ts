import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { TokenTypesEnum } from '@/utils/enums/token-types.enum';

export class UserTokenType extends SimpleValueObject<string> {
  private constructor(private readonly value: TokenTypesEnum) {
    super();
  }

  toValue(): string {
    return this.value;
  }

  static create(value: TokenTypesEnum): UserTokenType {
    return new this(value);
  }
}
