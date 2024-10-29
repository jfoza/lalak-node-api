import { UUID } from '@/common/infra/utils/uuid';
import { Ability, AbilityProps } from '@/acl/domain/core/ability';

describe('Ability Domain Entity Unit Tests', () => {
  let sut: Ability;
  let props: AbilityProps;

  beforeEach(async () => {
    props = {
      description: 'TEST_VIEW',
      subject: 'TEST',
      action: 'VIEW',
      active: true,
    } as AbilityProps;

    sut = new Ability(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.subject).toEqual(props.subject);
    expect(sut.props.action).toEqual(props.action);
    expect(sut.props.active).toEqual(props.active);
  });

  it('Getter of description field', () => {
    expect(sut.description).toBeDefined();
    expect(sut.description).toEqual(props.description);
    expect(typeof sut.description).toBe('string');
  });

  it('Getter of subject field', () => {
    expect(sut.subject).toBeDefined();
    expect(sut.subject).toEqual(props.subject);
    expect(typeof sut.subject).toBe('string');
  });

  it('Getter of action field', () => {
    expect(sut.action).toBeDefined();
    expect(sut.action).toEqual(props.action);
    expect(typeof sut.action).toBe('string');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('createValidated method should to instance new AdminUser class', async () => {
    const uuid = UUID.generate();
    const abilityProps = {
      description: 'TEST_VIEW',
      subject: 'TEST',
      action: 'VIEW',
      active: true,
    } as AbilityProps;
    const abilityClass = await Ability.create(abilityProps, uuid);

    expect(abilityClass).toBeInstanceOf(Ability);
    expect(abilityClass.uuid).toEqual(uuid);
  });
});
