import { Profile, ProfileProps } from '@/features/user/domain/entities/profile';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

describe('Profile Domain Entity Unit Tests', () => {
  let sut: Profile;
  let props: ProfileProps;

  beforeEach(async () => {
    props = UserDataBuilder.getAdminMasterProfileProps();

    sut = new Profile(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.uniqueName).toEqual(props.uniqueName);
  });

  it('Getter of description field', () => {
    expect(sut.description).toBeDefined();
    expect(sut.description).toEqual(props.description);
    expect(typeof sut.description).toBe('string');
  });

  it('Getter of uniqueName field', () => {
    expect(sut.uniqueName).toBeDefined();
    expect(sut.uniqueName).toEqual(props.uniqueName);
    expect(typeof sut.uniqueName).toBe('string');
  });

  it('create method should to instance new Profile class', async () => {
    const uniqueEntityId = UniqueEntityId.create();
    const profileProps = UserDataBuilder.getAdminMasterProfileProps();
    const profileClass = Profile.create(profileProps, uniqueEntityId);

    expect(profileClass).toBeInstanceOf(Profile);
    expect(profileClass.uuid).toEqual(uniqueEntityId.toValue());
  });
});
