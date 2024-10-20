import { AclService } from '@/acl/application/services/acl.service';
import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { vi } from 'vitest';
import { IAclRepository } from '@/acl/domain/interfaces/acl.repository.interface';
import { IRedisService } from '@/redis/domain/interfaces/redis.service.interface';
import { CacheEnum } from '@/common/infra/enums/cache.enum';

describe('AclService Unit tests', () => {
  let sut: AclService;

  const mockUser = { uuid: 'user-123' };
  const mockAbilities = ['ability1', 'ability2'];

  const aclRepository = {
    getUserAbilityDescriptions: vi.fn().mockResolvedValue(mockAbilities),
  } as unknown as IAclRepository;

  const jwtInfoService = {
    user: mockUser,
  } as unknown as JwtInfoService;

  const redisService = {
    remember: vi.fn().mockResolvedValue(mockAbilities),
    invalidate: vi.fn().mockResolvedValue(undefined),
    invalidateByPattern: vi.fn().mockResolvedValue(undefined),
  } as unknown as IRedisService;

  beforeEach(() => {
    sut = new AclService(aclRepository, jwtInfoService, redisService);
  });

  it('should return abilities from redis if user exists', async () => {
    const redisKey = CacheEnum.ABILITY_USER(mockUser.uuid);

    const result = await sut.handle();

    expect(redisService.remember).toHaveBeenCalledWith(
      redisKey,
      expect.any(Function),
      604800,
    );
    expect(result).toEqual(mockAbilities);
  });

  it('should return an empty array if no user is found', async () => {
    jwtInfoService.user = null;

    const result = await sut.handle();

    expect(result).toEqual([]);
  });

  it('should invalidate cache for a specific user', async () => {
    await sut.invalidate(mockUser.uuid);

    expect(redisService.invalidate).toHaveBeenCalledWith(
      CacheEnum.ABILITY_USER(mockUser.uuid),
    );
  });

  it('should invalidate all users cache by pattern', async () => {
    await sut.invalidateAll();

    expect(redisService.invalidateByPattern).toHaveBeenCalledWith(
      CacheEnum.ABILITY_USER('*'),
    );
  });
});
