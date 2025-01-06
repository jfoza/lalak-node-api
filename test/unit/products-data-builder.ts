import { Theme, ThemeProps } from '@/features/theme/domain/entities/theme';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/entities/category';
import {
  Product,
  ProductProps,
} from '@/features/product/domain/entities/product';
import { EventProps, Event } from '@/features/event/domain/entities/event';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UniqueName } from '@/common/domain/value-objects/unique-name';

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
    return Theme.create(this.getThemeProps());
  }

  static getCategoryProps(): CategoryProps {
    return {
      themeUuid: UniqueEntityId.create(),
      description: 'Theme 1',
      active: true,
      createdAt: new Date(),
      products: [],
    };
  }

  static getCategory(): Category {
    return Category.create(this.getCategoryProps());
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
    return Event.create(this.getEventProps());
  }

  static getProductProps(): ProductProps {
    return {
      description: 'test',
      details: '',
      uniqueName: UniqueName.createFrom('Test Name'),
      value: 0,
      quantity: 1,
      balance: 1,
      active: true,
      createdAt: new Date(),
    };
  }

  static getProduct(): Product {
    return Product.create(this.getProductProps());
  }
}
