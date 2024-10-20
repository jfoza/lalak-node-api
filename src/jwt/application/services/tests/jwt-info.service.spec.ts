import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { beforeEach, vi } from 'vitest';
import { UserDataBuilder } from '../../../../../test/unit/user-data-builder';
import { User } from '@/features/user/domain/core/user';

describe('JwtInfoService Unit Tests', () => {
  let sut: JwtInfoService;

  const userRepository: IUserRepository = {
    findByUserLoggedByUuid: vi.fn(() => null),
  } as unknown as IUserRepository;

  beforeEach(() => {
    sut = new JwtInfoService(userRepository);
  });

  it('Getter of user field', async () => {
    sut.user = await UserDataBuilder.getUserAdminType();

    expect(sut.user).toBeDefined();
    expect(sut.user).toBeInstanceOf(User);
  });

  it('Setter of user field', async () => {
    const user = await UserDataBuilder.getUserAdminType();

    sut['user'] = user;
    expect(sut.user.email).toEqual(user.email);
    expect(sut.user).toBeInstanceOf(User);
  });

  it('Should return user with relations', async () => {
    sut.user = await UserDataBuilder.getUserAdminType();

    const userRelations = await UserDataBuilder.getUserAdminType();

    userRepository.findByUserLoggedByUuid = vi.fn(async () => userRelations);

    const result = await sut.getUserRelations('relation');

    expect(userRepository.findByUserLoggedByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });
});
