import { UUID } from '@/common/infra/utils/uuid';
import { ProductsDataBuilder } from '../../../../../test/unit/products-data-builder';
import { Event, EventProps } from '@/features/event/domain/core/event';

describe('Event Domain Entity Unit Tests', () => {
  let sut: Event;
  let props: EventProps;

  beforeEach(async () => {
    props = ProductsDataBuilder.getEventProps();

    sut = new Event(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
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

  it('Setter of description field', () => {
    sut['description'] = 'test event';
    expect(sut.props.description).toEqual('test event');
    expect(typeof sut.props.description).toBe('string');
  });

  it('Setter of active field', () => {
    sut['active'] = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });

  it('create method should to instance new Event class', async () => {
    const uuid = UUID.generate();
    const eventProps = ProductsDataBuilder.getEventProps();

    const eventClass = await Event.create(eventProps, uuid);

    expect(eventClass).toBeInstanceOf(Event);
    expect(eventClass.uuid).toEqual(uuid);
  });
});
