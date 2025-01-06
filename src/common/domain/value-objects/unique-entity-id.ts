import { SimpleValueObject } from '@/common/domain/value-objects/simple-value-object';
import { UUID } from '@/utils/uuid';

export class UniqueEntityId extends SimpleValueObject<string> {
  protected value: string;

  constructor(value?: string) {
    super();

    this.value = value ?? UUID.generate();
  }

  toValue(): string {
    return this.value;
  }

  static create(value?: string): UniqueEntityId {
    return new UniqueEntityId(value);
  }
}
