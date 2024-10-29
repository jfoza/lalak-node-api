import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/core/admin-user';
import { UUID } from '@/common/infra/utils/uuid';
import { BadRequestException } from '@nestjs/common';

describe('AdminUser Domain Entity Unit Tests', () => {
  let sut: AdminUser;
  let props: AdminUserProps;

  beforeEach(async () => {
    props = {
      userUuid: UUID.generate(),
    };

    sut = new AdminUser(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.userUuid).toEqual(props.userUuid);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of userUuid field', () => {
    expect(sut.userUuid).toBeDefined();
    expect(sut.userUuid).toEqual(props.userUuid);
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('createValidated method should to instance new AdminUser class', async () => {
    const uuid = UUID.generate();
    const userUuid = UUID.generate();
    const adminUserProps = {
      userUuid,
    };
    const adminUserClass = await AdminUser.createValidated(
      adminUserProps,
      uuid,
    );

    expect(adminUserClass).toBeInstanceOf(AdminUser);
    expect(adminUserClass.uuid).toEqual(uuid);
  });

  it('createValidated method should return exception if personUuid is invalid', async () => {
    const userUuid = UUID.generate();
    const adminUserProps = {
      userUuid,
    };

    adminUserProps.userUuid = 'invalid';

    await expect(AdminUser.createValidated(adminUserProps)).rejects.toThrow(
      BadRequestException,
    );
  });
});
