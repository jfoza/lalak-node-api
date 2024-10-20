import { Theme, ThemeProps } from '@/features/themes/domain/core/theme';

export class ProductsDataBuilder {
  static getThemeProps(): ThemeProps {
    return {
      description: 'Theme 1',
      active: true,
      createdAt: new Date(),
    };
  }

  static getTheme(): Theme {
    return new Theme(this.getThemeProps());
  }
}
