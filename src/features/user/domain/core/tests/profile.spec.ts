import { Profile, ProfileProps } from '@/features/user/domain/core/profile';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

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

  it('createAndValidate method should to instance new Profile class', async () => {
    const uuid = UUID.generate();
    const profileProps = UserDataBuilder.getAdminMasterProfileProps();
    const profileClass = await Profile.createAndValidate(profileProps, uuid);

    expect(profileClass).toBeInstanceOf(Profile);
    expect(profileClass.uuid).toEqual(uuid);
  });
});
