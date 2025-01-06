export abstract class SimpleValueObject<TValue> {
  abstract toValue(): TValue;
  toString(): string {
    return '';
  }
}
