import {
  ProductSearchParams,
  ProductSearchParamsProps,
} from '@/features/product/domain/core/product-search-params';
import { UUID } from '@/common/infra/utils/uuid';

describe('ProductSearchParams Unit Tests', () => {
  let sut: ProductSearchParams;
  let props: ProductSearchParamsProps;

  beforeEach(async () => {
    props = {
      description: 'test',
      userUuid: UUID.generate(),
      categories: [UUID.generate()],
      events: [UUID.generate()],
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    };

    sut = new ProductSearchParams(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.userUuid).toEqual(props.userUuid);
    expect(sut.props.categories).toEqual(props.categories);
    expect(sut.props.events).toEqual(props.events);
    expect(sut.props.page).toEqual(props.page);
    expect(sut.props.perPage).toEqual(props.perPage);
    expect(sut.props.columnOrder).toEqual(props.columnOrder);
    expect(sut.props.columnName).toEqual(props.columnName);
  });

  it('Getter of description field', () => {
    expect(sut.description).toBeDefined();
    expect(sut.description).toEqual(props.description);
    expect(typeof sut.description).toBe('string');
  });

  it('Getter of userUuid field', () => {
    expect(sut.userUuid).toBeDefined();
    expect(sut.userUuid).toEqual(props.userUuid);
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of categories field', () => {
    expect(sut.categories).toBeDefined();
    expect(Array.isArray(sut.categories)).toBe(true);
    expect(sut.categories).toEqual(props.categories);
    expect(sut.categories).toHaveLength(props.categories.length);
  });

  it('Getter of events field', () => {
    expect(sut.events).toBeDefined();
    expect(Array.isArray(sut.events)).toBe(true);
    expect(sut.events).toEqual(props.events);
    expect(sut.events).toHaveLength(props.events.length);
  });

  it('create method should to instance new ThemeSearchParams class', async () => {
    const propsAux = {
      description: 'test',
      userUuid: UUID.generate(),
      categories: [UUID.generate()],
      events: [UUID.generate()],
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    } as ProductSearchParamsProps;

    const productSearchParams = ProductSearchParams.create(propsAux);

    expect(productSearchParams).toBeInstanceOf(ProductSearchParams);
  });
});
