import { expect } from 'vitest';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('PolicyAdapter Unit Tests', () => {
  let sut: PolicyAdapter;

  beforeEach(() => {
    sut = new PolicyAdapter(Policy.create([]));
  });

  describe('toValue', () => {
    it('should set and get abilities correctly', () => {
      const abilities: string[] = ['read', 'write'];
      sut = new PolicyAdapter(Policy.create(abilities));

      expect(sut.toValue()).toEqual(abilities);
    });

    it('should return an empty array if no abilities are set', () => {
      expect(sut.toValue()).toEqual([]);
    });
  });

  describe('has', () => {
    it('should return true if the ability exists in abilities', () => {
      const abilities: string[] = ['read', 'write'];
      sut = new PolicyAdapter(Policy.create(abilities));
      expect(sut.has('read')).toBe(true);
    });

    it('should return false if the ability does not exist in abilities', () => {
      sut = new PolicyAdapter(Policy.create());
      expect(sut.has('write')).toBe(false);
    });
  });

  describe('can', () => {
    it('should not throw an exception if the ability exists', () => {
      const abilities: string[] = ['read', 'write'];
      sut = new PolicyAdapter(Policy.create(abilities));
      expect(() => sut.can('read')).not.toThrow();
    });

    it('should throw ForbiddenException if the ability does not exist', () => {
      const abilities = ['read'];
      sut = new PolicyAdapter(Policy.create(abilities));
      expect(() => sut.can('write')).toThrow(ForbiddenException);
      expect(() => sut.can('write')).toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
    });
  });

  describe('policyException', () => {
    it('should throw ForbiddenException with the correct error message', () => {
      sut = new PolicyAdapter(Policy.create(['read']));

      expect(() => sut.can('ABC')).toThrow(AclForbiddenException);
      expect(() => sut.can('ABC')).toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
    });
  });
});
