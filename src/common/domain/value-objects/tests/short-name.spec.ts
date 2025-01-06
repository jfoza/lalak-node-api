import { ShortName } from '@/common/domain/value-objects/short-name';

describe('ShortName Value Object Unit Tests', () => {
  let sut: ShortName;

  it('toValue method', async () => {
    sut = ShortName.createFrom('Test Name');
    expect(sut.toValue()).toEqual('TE');
  });

  it('createFrom method should to instance new ShortName class', async () => {
    sut = ShortName.createFrom('Test Name');
    expect(sut.toValue()).toEqual('TE');

    expect(sut).toBeInstanceOf(ShortName);
  });

  it('create method should to instance new ShortName class', async () => {
    sut = ShortName.create('TE');
    expect(sut.toValue()).toEqual('TE');

    expect(sut).toBeInstanceOf(ShortName);
  });
});
