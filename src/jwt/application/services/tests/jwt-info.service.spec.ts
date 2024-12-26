import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { beforeEach, vi } from 'vitest';
import { UserDataBuilder } from '../../../../../test/unit/user-data-builder';
import { JwtAuth } from '@/jwt/domain/entities/jwt-auth';

describe('JwtInfoService Unit Tests', () => {
  let sut: JwtInfoService;

  const userRepository: IUserRepository = {
    findByUserLoggedByUuid: vi.fn(() => null),
  } as unknown as IUserRepository;

  beforeEach(async () => {
    sut = new JwtInfoService(
      userRepository,
      new JwtAuth(await UserDataBuilder.getUser()),
    );
  });
});
