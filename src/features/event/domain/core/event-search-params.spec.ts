import {
  EventSearchParams,
  EventSearchParamsProps,
} from '@/features/event/domain/core/event-search-params';

describe('EventSearchParamsProps Unit Tests', () => {
  let sut: EventSearchParams;
  let props: EventSearchParamsProps;

  beforeEach(async () => {
    props = {
      description: 'test',
      active: false,
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    };

    sut = new EventSearchParams(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.active).toEqual(props.active);
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

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('create method should to instance new EventSearchParams class', async () => {
    const propsAux = {
      description: 'test',
      active: false,
      page: 1,
      perPage: 10,
      columnOrder: 'asc',
      columnName: 'description',
    } as EventSearchParamsProps;

    const eventSearchParams = EventSearchParams.create(propsAux);

    expect(eventSearchParams).toBeInstanceOf(EventSearchParams);
  });
});
