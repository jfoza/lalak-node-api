import { Password } from '@/features/user/domain/value-objects/password';
import { Hash } from '@/utils/hash';

describe('Password Value Object Unit Tests', async () => {
  let sut: Password;
  const hash = await Hash.create('test-password');

  beforeEach(async () => {
    sut = Password.create(hash);
  });

  it('toValue method', async () => {
    expect(sut.toValue()).toEqual(hash);
  });

  it('create method should to instance new Password class', async () => {
    const pass = Password.create(hash);

    expect(pass).toBeInstanceOf(Password);
  });

  it('createFrom method should to instance new Password class', async () => {
    const str = 'test123';
    const password = await Password.createFrom(str);

    expect(await Hash.compare(str, password.toValue())).toBe(true);
    expect(password).toBeInstanceOf(Password);
  });
});
