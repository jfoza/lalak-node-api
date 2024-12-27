import { describe, it, expect, vi } from 'vitest';
import { IJwtToken, JwtAuthService } from '../jwt-auth.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { User } from '@/features/user/domain/entities/user';
import { UserDataBuilder } from '../../../../../test/unit/user-data-builder';

vi.mock('node:process', () => ({
  env: { JWT_EXPIRATION: '3600' },
}));

describe('JwtAuthService', async () => {
  let sut: JwtAuthService;

  const mockJwtService = {
    sign: vi.fn(),
    verifyAsync: vi.fn(),
  } as unknown as NestJwtService;

  const mockUserRepository = {
    findByUserLoggedByUuid: vi.fn(),
  } as unknown as IUserRepository;

  const mockUser = await UserDataBuilder.getUser();

  beforeEach(() => {
    sut = new JwtAuthService(mockJwtService, mockUserRepository);
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

  describe('setAuthUser', () => {
    it('should set the authenticated user', async () => {
      const userProps = await UserDataBuilder.getUserProps();
      const uuid = 'user-uuid';

      vi.spyOn(User, 'create').mockResolvedValue(mockUser);

      await sut.setAuthUser(userProps, uuid);

      expect(User.create).toHaveBeenCalledWith(userProps, uuid);
      expect(sut['authUser']).toEqual(mockUser);
    });
  });

  describe('user', () => {
    it('should return null if no authenticated user is set', async () => {
      const result = await sut.user();
      expect(result).toBeNull();
    });

    it('should return the authenticated user if no relation is provided', async () => {
      sut['authUser'] = mockUser;

      const result = await sut.user();
      expect(result).toEqual(mockUser);
    });

    it('should return the user with relations if a relation is provided', async () => {
      sut['authUser'] = mockUser;
      const relation = 'person';
      const userWithRelations = await UserDataBuilder.getUser();

      userWithRelations.person = UserDataBuilder.getPerson();

      vi.spyOn(mockUserRepository, 'findByUserLoggedByUuid').mockResolvedValue(
        userWithRelations,
      );

      const result = await sut.user(relation);

      expect(mockUserRepository.findByUserLoggedByUuid).toHaveBeenCalledWith(
        mockUser.uuid,
        relation,
      );
      expect(result).toEqual(userWithRelations);
    });
  });
});
