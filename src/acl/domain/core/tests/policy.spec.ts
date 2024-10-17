import { Policy } from '@/acl/domain/core/policy';
import { expect } from 'vitest';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('Policy Unit Tests', () => {
  let sut: Policy;

  beforeEach(() => {
    sut = new Policy();
  });

  describe('set abilities and get abilities', () => {
    it('should set and get abilities correctly', () => {
      const abilities = ['read', 'write'];
      sut.abilities = abilities;

      expect(sut.abilities).toEqual(abilities);
    });

    it('should return an empty array if no abilities are set', () => {
      expect(sut.abilities).toEqual([]);
    });
  });

  describe('has', () => {
    it('should return true if the ability exists in abilities', () => {
      sut.abilities = ['read', 'write'];
      expect(sut.has('read')).toBe(true);
    });

    it('should return false if the ability does not exist in abilities', () => {
      sut.abilities = ['read'];
      expect(sut.has('write')).toBe(false);
    });
  });

  describe('can', () => {
    it('should not throw an exception if the ability exists', () => {
      sut.abilities = ['read', 'write'];
      expect(() => sut.can('read')).not.toThrow();
    });

    it('should throw ForbiddenException if the ability does not exist', () => {
      sut.abilities = ['read'];
      expect(() => sut.can('write')).toThrow(ForbiddenException);
      expect(() => sut.can('write')).toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
    });
  });

  describe('policyException', () => {
    it('should throw ForbiddenException with the correct error message', () => {
      expect(() => sut.policyException()).toThrow(ForbiddenException);
      expect(() => sut.policyException()).toThrow(
        ErrorMessagesEnum.NOT_AUTHORIZED,
      );
    });
  });
});
