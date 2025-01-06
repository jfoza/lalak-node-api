import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { Hash } from '@/utils/hash';

export class Password extends SimpleValueObject<string> {
  private constructor(private readonly value: string) {
    super();
  }

  toValue(): string {
    return this.value;
  }

  static create(value: string): Password {
    return new this(value);
  }

  static async createFrom(value: string): Promise<Password> {
    return new this(await Hash.create(value));
  }
}
