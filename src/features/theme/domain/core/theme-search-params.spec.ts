import {
  ThemeSearchParams,
  ThemeSearchParamsProps,
} from '@/features/theme/domain/core/theme-search-params';

describe('ThemeSearchParamsProps Unit Tests', () => {
  let sut: ThemeSearchParams;
  let props: ThemeSearchParamsProps;

  beforeEach(async () => {
    props = {
      description: 'test',
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    };

    sut = new ThemeSearchParams(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
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

  it('create method should to instance new ThemeSearchParams class', async () => {
    const propsAux = {
      description: 'test',
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    } as ThemeSearchParamsProps;

    const themeSearchParams = ThemeSearchParams.create(propsAux);

    expect(themeSearchParams).toBeInstanceOf(ThemeSearchParams);
  });
});
