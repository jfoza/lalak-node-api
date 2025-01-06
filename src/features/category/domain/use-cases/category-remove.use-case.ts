export interface ICategoryRemoveUseCase {
  execute(uuid: string): Promise<void>;
}

export const ICategoryRemoveUseCase = Symbol('ICategoryRemoveUseCase');
