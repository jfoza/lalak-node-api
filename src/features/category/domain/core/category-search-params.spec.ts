import { UUID } from '@/common/infra/utils/uuid';
import {
  CategorySearchParams,
  CategorySearchParamsProps,
} from '@/features/category/domain/core/category-search-params';

describe('CategorySearchParamsProps Unit Tests', () => {
  let sut: CategorySearchParams;
  let props: CategorySearchParamsProps;

  beforeEach(async () => {
    props = {
      themeUuid: UUID.generate(),
      description: 'test',
      active: true,
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    };

    sut = new CategorySearchParams(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.themeUuid).toEqual(props.themeUuid);
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.page).toEqual(props.page);
    expect(sut.props.perPage).toEqual(props.perPage);
    expect(sut.props.columnOrder).toEqual(props.columnOrder);
    expect(sut.props.columnName).toEqual(props.columnName);
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

  it('create method should to instance new ThemeSearchParams class', async () => {
    const propsAux = {
      themeUuid: UUID.generate(),
      description: 'test',
      active: true,
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    } as CategorySearchParamsProps;

    const categorySearchParams = CategorySearchParams.create(propsAux);

    expect(categorySearchParams).toBeInstanceOf(CategorySearchParams);
  });
});
