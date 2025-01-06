export abstract class Validator<T> {
  abstract validate(entity: T): void;
}
