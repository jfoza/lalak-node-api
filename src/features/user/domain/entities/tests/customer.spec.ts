import {
  Customer,
  CustomerProps,
} from '@/features/user/domain/entities/customer';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

describe('Customer Domain Entity Unit Tests', () => {
  let sut: Customer;
  let props: CustomerProps;

  beforeEach(async () => {
    props = {
      userUuid: UniqueEntityId.create(),
      verifiedEmail: true,
      createdAt: new Date(),
    } as CustomerProps;

    sut = new Customer(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.userUuid).toEqual(props.userUuid);
    expect(sut.props.verifiedEmail).toEqual(props.verifiedEmail);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of userUuid field', () => {
    expect(sut.userUuid).toBeDefined();
    expect(sut.userUuid).toEqual(props.userUuid.toValue());
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of verifiedEmail field', () => {
    expect(sut.verifiedEmail).toBeDefined();
    expect(sut.verifiedEmail).toEqual(props.verifiedEmail);
    expect(typeof sut.verifiedEmail).toBe('boolean');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Setter of verifiedEmail field', () => {
    sut['verifiedEmail'] = true;
    expect(sut.props.verifiedEmail).toEqual(true);
    expect(typeof sut.props.verifiedEmail).toBe('boolean');
  });

  it('create method should to instance new AdminUser class', async () => {
    const uniqueEntityId = UniqueEntityId.create();
    const customerProps = {
      userUuid: UniqueEntityId.create(),
      verifiedEmail: true,
      createdAt: new Date(),
    } as CustomerProps;

    const customerClass = await Customer.create(customerProps, uniqueEntityId);

    expect(customerClass).toBeInstanceOf(Customer);
    expect(customerClass.uuid).toEqual(uniqueEntityId.toValue());
  });
});
