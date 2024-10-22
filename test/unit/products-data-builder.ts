import { Theme, ThemeProps } from '@/features/themes/domain/core/theme';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/core/category';
import { UUID } from '@/common/infra/utils/uuid';

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

  static getCategoryProps(): CategoryProps {
    return {
      themeUuid: UUID.generate(),
      description: 'Theme 1',
      active: true,
      createdAt: new Date(),
    };
  }

  static getCategory(): Category {
    return new Category(this.getCategoryProps());
  }
}
