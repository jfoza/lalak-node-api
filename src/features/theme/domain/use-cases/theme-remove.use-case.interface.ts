export interface IThemeRemoveUseCase {
  execute(uuid: string): Promise<void>;
}

export const IThemeRemoveUseCase = Symbol('IThemeRemoveUseCase');
