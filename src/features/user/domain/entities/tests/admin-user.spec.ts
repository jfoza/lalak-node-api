import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/entities/admin-user';

describe('AdminUser Domain Entity Unit Tests', () => {
  let sut: AdminUser;
  let props: AdminUserProps;

  beforeEach(async () => {
    props = {
      userUuid: UniqueEntityId.create(),
    };

    sut = new AdminUser(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.userUuid).toEqual(props.userUuid);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of userUuid field', () => {
    expect(sut.userUuid).toBeDefined();
    expect(sut.userUuid).toEqual(props.userUuid.toValue());
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('create method should to instance new AdminUser class', async () => {
    const uniqueEntityId = UniqueEntityId.create();
    const adminUserProps = {
      userUuid: uniqueEntityId,
    };
    const adminUserClass = AdminUser.create(adminUserProps, uniqueEntityId);

    expect(adminUserClass).toBeInstanceOf(AdminUser);
    expect(adminUserClass.uuid).toEqual(uniqueEntityId.toValue());
  });
});
