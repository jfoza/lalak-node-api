import { Theme } from '@/features/theme/domain/entities/theme';
import { IThemeCreateDto } from '@/features/theme/domain/dto/theme-create.dto.interface';

export interface IThemeCreateUseCase {
  execute(themeCreateDto: IThemeCreateDto): Promise<Theme>;
}

export const IThemeCreateUseCase = Symbol('IThemeCreateUseCase');
