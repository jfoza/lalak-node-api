import { UniqueName } from '@/common/domain/value-objects/unique-name';

describe('UniqueName Value Object Unit Tests', () => {
  let sut: UniqueName;

  it('toValue method', async () => {
    sut = UniqueName.createFrom('Test Name');
    expect(sut.toValue()).toEqual('test-name');
  });

  it('createFrom method should to instance new UniqueName class', async () => {
    sut = UniqueName.createFrom('Test Name');
    expect(sut.toValue()).toEqual('test-name');

    expect(sut).toBeInstanceOf(UniqueName);
  });

  it('create method should to instance new UniqueName class', async () => {
    sut = UniqueName.create('test-name');
    expect(sut.toValue()).toEqual('test-name');

    expect(sut).toBeInstanceOf(UniqueName);
  });
});
