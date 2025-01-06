import { Phone } from '@/common/domain/value-objects/phone';

describe('Phone Value Object Unit Tests', () => {
  let sut: Phone;

  it('toValue method', async () => {
    sut = Phone.createFrom('(51) 99912-2009');
    expect(sut.toValue()).toEqual('51999122009');
  });

  it('createFrom method should to instance new Phone class', async () => {
    sut = Phone.createFrom('(51) 99912-2009');
    expect(sut.toValue()).toEqual('51999122009');

    expect(sut).toBeInstanceOf(Phone);
  });

  it('create method should to instance new Phone class', async () => {
    sut = Phone.create('51999122009');
    expect(sut.toValue()).toEqual('51999122009');

    expect(sut).toBeInstanceOf(Phone);
  });
});
