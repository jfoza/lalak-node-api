export interface IProductRemoveUseCase {
  execute(uuid: string): Promise<void>;
}

export const IProductRemoveUseCase = Symbol('IProductRemoveUseCase');
