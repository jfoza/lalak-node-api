import { Theme } from '@/features/theme/domain/entities/theme';
import { IThemeUpdateDto } from '@/features/theme/domain/dto/theme-update.dto.interface';

export interface IThemeUpdateUseCase {
  execute(uuid: string, themeUpdateDto: IThemeUpdateDto): Promise<Theme>;
}

export const IThemeUpdateUseCase = Symbol('IThemeUpdateUseCase');
