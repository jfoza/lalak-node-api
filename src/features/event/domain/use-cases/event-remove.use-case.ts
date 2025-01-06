export interface IEventRemoveUseCase {
  execute(uuid: string): Promise<void>;
}

export const IEventRemoveUseCase = Symbol('IEventRemoveUseCase');
