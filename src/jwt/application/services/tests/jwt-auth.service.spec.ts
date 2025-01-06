import { describe, it, expect, vi } from 'vitest';
import { IJwtToken, JwtAuthService } from '../jwt-auth.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UserDataBuilder } from '../../../../../test/unit/user-data-builder';
import { UUID } from '@/utils/uuid';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

vi.mock('node:process', () => ({
  env: { JWT_EXPIRATION: '3600' },
}));

describe('JwtAuthService', async () => {
  let sut: JwtAuthService;

  const mockJwtService = {
    sign: vi.fn(),
    verifyAsync: vi.fn(),
  } as unknown as NestJwtService;

  const personAuthUserMock = await UserDataBuilder.getPersonAuthUser();

  beforeEach(() => {
    sut = new JwtAuthService(mockJwtService);
  });

  describe('sign', () => {
    it('should return a signed token with expiration and type', () => {
      const payload = { sub: 'test' };
      const mockToken = 'mock.jwt.token';
      process.env.JWT_EXPIRATION = '3600';

      vi.spyOn(mockJwtService, 'sign').mockReturnValue(mockToken);

      const result: IJwtToken = sut.sign(payload);

      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({
        token: mockToken,
        type: 'JWT',
        expiration: 3600,
      });
    });
  });

  describe('verifyAsync', () => {
    it('should verify the token and return the decoded payload', async () => {
      const token = 'mock.jwt.token';
      const decodedPayload = { sub: 'test' };

      vi.spyOn(mockJwtService, 'verifyAsync').mockResolvedValue(decodedPayload);

      const result = await sut.verifyAsync(token);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token, undefined);
      expect(result).toEqual(decodedPayload);
    });
  });

  describe('set user', () => {
    it('should set the authenticated user', async () => {
      const personAuthUserProps =
        await UserDataBuilder.getPersonAuthUserProps();
      const uuid = UUID.generate();

      const personAuthUser = PersonAuthUser.create(
        personAuthUserProps,
        UniqueEntityId.create(uuid),
      );

      sut.user = personAuthUser;

      expect(sut.user).toEqual(personAuthUser);
    });
  });

  describe('user', () => {
    it('should return null if no authenticated user is set', async () => {
      const result: PersonAuthUser = sut.user;
      expect(result).toBeNull();
    });

    it('should return the authenticated user if no relation is provided', async () => {
      sut['authUser'] = personAuthUserMock;

      const result = sut.user;
      expect(result).toEqual(personAuthUserMock);
    });
  });
});
