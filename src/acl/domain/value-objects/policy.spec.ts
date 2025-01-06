import { expect } from 'vitest';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('Policy Unit Tests', () => {
  let sut: Policy;

  it('toValue method', async () => {
    sut = Policy.create(['test']);
    expect(sut.toValue()).toEqual(['test']);
  });

  it('create method should to instance new Address class', async () => {
    sut = Policy.create(['test']);
    expect(sut.toValue()).toEqual(['test']);

    expect(sut).toBeInstanceOf(Policy);
  });
});
