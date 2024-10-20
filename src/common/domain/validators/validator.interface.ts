export interface IValidator<T> {
  validate(entity: T): Promise<void>;
}
