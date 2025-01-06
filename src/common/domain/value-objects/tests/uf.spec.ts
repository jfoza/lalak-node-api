import { Uf } from '@/common/domain/value-objects/uf';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

describe('Uf Value Object Unit Tests', () => {
  let sut: Uf;

  it('toValue method', async () => {
    sut = Uf.create('RS');
    expect(sut.toValue()).toEqual('RS');
  });

  it('createFrom method should to instance new Address class', async () => {
    sut = Uf.createFrom('RJ');
    expect(sut.toValue()).toEqual('RJ');

    expect(sut).toBeInstanceOf(Uf);
  });

  it('create method should to instance new Uf class', async () => {
    sut = Uf.create('test');
    expect(sut.toValue()).toEqual('test');

    expect(sut).toBeInstanceOf(Uf);
  });

  it('should throw an error for invalid value inputs', () => {
    expect(() => Uf.createFrom('ABC')).toThrow(EntityValidationException);
  });
});
