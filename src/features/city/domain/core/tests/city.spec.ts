import { City, CityProps } from '@/features/city/domain/core/city';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';
import { UUID } from '@/common/infra/utils/uuid';

describe('City Domain Entity Unit Tests', () => {
  let sut: City;
  let props: CityProps;

  beforeEach(async () => {
    props = {
      description: 'test',
      uf: BrazilianStates.RS,
      active: true,
      createdAt: new Date(),
    } as CityProps;

    sut = new City(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.uf).toEqual(props.uf);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.createdAt).toEqual(props.createdAt);
  });

  it('Getter of description field', () => {
    expect(sut.description).toBeDefined();
    expect(sut.description).toEqual(props.description);
    expect(typeof sut.description).toBe('string');
  });

  it('Getter of uf field', () => {
    expect(sut.uf).toBeDefined();
    expect(sut.uf).toEqual(props.uf);
    expect(typeof sut.uf).toBe('string');
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

  it('create method should to instance new City class', async () => {
    const uuid = UUID.generate();
    const cityProps = {
      description: 'test',
      uf: BrazilianStates.RS,
      active: true,
      createdAt: new Date(),
    } as CityProps;

    const cityClass = await City.create(cityProps, uuid);

    expect(cityClass).toBeInstanceOf(City);
    expect(cityClass.uuid).toEqual(uuid);
  });
});
