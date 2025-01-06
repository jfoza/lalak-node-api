import { Address } from '@/common/domain/value-objects/address';

describe('Address Value Object Unit Tests', () => {
  let sut: Address;

  it('toValue method', async () => {
    sut = Address.createFrom('test');
    expect(sut.toValue()).toEqual('test');
  });

  it('createFrom method should to instance new Address class', async () => {
    sut = Address.createFrom('te-s$t');
    expect(sut.toValue()).toEqual('test');

    expect(sut).toBeInstanceOf(Address);
  });

  it('create method should to instance new Address class', async () => {
    sut = Address.create('test');
    expect(sut.toValue()).toEqual('test');

    expect(sut).toBeInstanceOf(Address);
  });
});
