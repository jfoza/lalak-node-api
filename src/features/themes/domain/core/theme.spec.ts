import { UUID } from '@/common/infra/utils/uuid';
import { Theme, ThemeProps } from '@/features/themes/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../test/unit/products-data-builder';

describe('Theme Domain Entity Unit Tests', () => {
  let sut: Theme;
  let props: ThemeProps;

  beforeEach(async () => {
    props = ProductsDataBuilder.getThemeProps();

    sut = new Theme(props);
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

  it('create method should to instance new Theme class', async () => {
    const uuid = UUID.generate();
    const themeProps = ProductsDataBuilder.getThemeProps();

    const themeClass = await Theme.create(themeProps, uuid);

    expect(themeClass).toBeInstanceOf(Theme);
    expect(themeClass.uuid).toEqual(uuid);
  });
});
