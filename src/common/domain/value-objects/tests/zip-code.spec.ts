import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

describe('ZipCode Value Object Unit Tests', () => {
  let sut: ZipCode;

  it('toValue method', async () => {
    sut = ZipCode.createFrom('99999-999');
    expect(sut.toValue()).toEqual('99999999');
  });

  it('createFrom method should to instance new ZipCode class', async () => {
    sut = ZipCode.createFrom('99999-999');
    expect(sut.toValue()).toEqual('99999999');

    expect(sut).toBeInstanceOf(ZipCode);
  });

  it('create method should to instance new ZipCode class', async () => {
    sut = ZipCode.create('99999999');
    expect(sut.toValue()).toEqual('99999999');

    expect(sut).toBeInstanceOf(ZipCode);
  });

  it('should throw an error for invalid value inputs', () => {
    expect(() => ZipCode.createFrom('99-99')).toThrow(
      EntityValidationException,
    );

    expect(() => ZipCode.createFrom('999999999')).toThrow(
      EntityValidationException,
    );
  });
});
