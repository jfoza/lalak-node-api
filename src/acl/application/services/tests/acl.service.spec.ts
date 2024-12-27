import { AclService } from '@/acl/application/services/acl.service';
import { vi } from 'vitest';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';
import { UUID } from '@/utils/uuid';

describe('AclService Unit tests', () => {
  let sut: AclService;

  const mockUser = { uuid: UUID.generate() };
  const mockAbilities = ['ability1', 'ability2'];

  const aclRepository = {
    findDescriptionByUserUuid: vi.fn().mockResolvedValue(mockAbilities),
  } as unknown as IAclRepository;

  const jwtAuthService = {
    user: vi.fn(() => mockUser),
  } as unknown as IJwtAuthService;

  beforeEach(() => {
    sut = new AclService(aclRepository, jwtAuthService);
  });

  it('should return abilities if user exists', async () => {
    const result = await sut.execute();

    expect(result).toEqual(mockAbilities);
  });

  it('should return an empty array', async () => {
    aclRepository.findDescriptionByUserUuid = vi.fn().mockResolvedValue([]);

    const result = await sut.execute();

    expect(result).toEqual([]);
  });
});
