import { AbstractThemeListUseCase } from '@/features/theme/domain/use-cases/abstract.theme-list.use-case';
import { beforeEach, vi } from 'vitest';
import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';
import { PublicThemeListService } from '@/features/theme/application/services/public.theme-list.service';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { Theme } from '@/features/theme/domain/core/theme';

describe('PublicThemeListService Unit Tests', () => {
  let sut: PublicThemeListService;
  let themeListUseCase: AbstractThemeListUseCase;
  let themeSearchParamsDto: ThemeSearchParamsDto;

  const themes: Theme[] = [ProductsDataBuilder.getTheme()];

  beforeEach(() => {
    themeListUseCase = {
      execute: vi.fn(async () => themes),
    } as AbstractThemeListUseCase;

    sut = new PublicThemeListService(themeListUseCase);

    themeSearchParamsDto = { description: '' } as ThemeSearchParamsDto;
  });

  it('Should return Should return a paginated list of themes', async () => {
    const result = await sut.handle(themeSearchParamsDto);

    if (Array.isArray(result)) {
      expect(Array.isArray(themes)).toBe(true);

      result.forEach((theme) => {
        expect(theme).toBeInstanceOf(Theme);
      });

      expect(result.every((theme) => theme instanceof Theme)).toBe(true);
    }

    expect(themeListUseCase.execute).toHaveBeenCalled();
  });
});
