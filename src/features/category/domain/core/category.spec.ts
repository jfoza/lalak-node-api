import { UUID } from '@/common/infra/utils/uuid';
import { ProductsDataBuilder } from '../../../../../test/unit/products-data-builder';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/core/category';

describe('Category Domain Entity Unit Tests', () => {
  let sut: Category;
  let props: CategoryProps;

  beforeEach(async () => {
    props = ProductsDataBuilder.getCategoryProps();

    sut = new Category(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.themeUuid).toEqual(props.themeUuid);
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of themeUuid field', () => {
    expect(sut.themeUuid).toBeDefined();
    expect(sut.themeUuid).toEqual(props.themeUuid);
    expect(typeof sut.themeUuid).toBe('string');
  });

  it('Getter of description field', () => {
    expect(sut.description).toBeDefined();
    expect(sut.description).toEqual(props.description);
    expect(typeof sut.description).toBe('string');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('create method should to instance new Category class', async () => {
    const uuid = UUID.generate();
    const categoryProps = ProductsDataBuilder.getCategoryProps();

    const categoryClass = await Category.create(categoryProps, uuid);

    expect(categoryClass).toBeInstanceOf(Category);
    expect(categoryClass.uuid).toEqual(uuid);
  });
});
