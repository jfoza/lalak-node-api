import { Theme } from '@/features/theme/domain/entities/theme';

export interface IThemeListByUuidUseCase {
  execute(uuid: string): Promise<Theme>;
}

export const IThemeListByUuidUseCase = Symbol('IThemeListByUuidUseCase');
