import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';

export class Policy extends SimpleValueObject<string[]> {
  private constructor(private readonly abilities: string[] = []) {
    super();
  }

  toValue(): string[] {
    return this.abilities;
  }

  static create(abilities: string[] = []): Policy {
    return new this(abilities);
  }
}
