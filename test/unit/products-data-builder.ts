import { Theme, ThemeProps } from '@/features/theme/domain/core/theme';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/core/category';
import { UUID } from '@/common/infra/utils/uuid';
import { Product, ProductProps } from '@/features/product/domain/core/product';
import { EventProps, Event } from '@/features/event/domain/core/event';

export class ProductsDataBuilder {
  static getThemeProps(): ThemeProps {
    return {
      description: 'Theme 1',
      active: true,
      createdAt: new Date(),
      categories: [],
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
      products: [],
    };
  }

  static getCategory(): Category {
    return new Category(this.getCategoryProps());
  }

  static getEventProps(): EventProps {
    return {
      description: 'test',
      active: true,
      createdAt: new Date(),
      products: [],
    };
  }

  static getEvent(): Event {
    return new Event(this.getEventProps());
  }

  static getProductProps(): ProductProps {
    return {
      description: 'test',
      details: '',
      uniqueName: 'test',
      value: 0,
      quantity: 1,
      balance: 1,
      active: true,
      createdAt: new Date(),
    };
  }

  static getProduct(): Product {
    return new Product(this.getProductProps());
  }
}
