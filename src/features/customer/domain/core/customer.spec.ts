import { UUID } from '@/common/infra/utils/uuid';
import { BadRequestException } from '@nestjs/common';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/core/customer';

describe('Customer Domain Entity Unit Tests', () => {
  let sut: Customer;
  let props: CustomerProps;

  beforeEach(async () => {
    props = {
      userUuid: UUID.generate(),
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
    expect(sut.userUuid).toEqual(props.userUuid);
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

  it('createAndValidate method should to instance new AdminUser class', async () => {
    const customerUuid = UUID.generate();
    const customerProps = {
      userUuid: UUID.generate(),
      verifiedEmail: true,
    } as CustomerProps;

    const customerClass = await Customer.createAndValidate(
      customerProps,
      customerUuid,
    );

    expect(customerClass).toBeInstanceOf(Customer);
    expect(customerClass.uuid).toEqual(customerUuid);
  });

  it('createAndValidate method should return exception if userUuid is invalid', async () => {
    const customerProps = {
      userUuid: 'invalid',
      verifiedEmail: true,
    } as CustomerProps;

    await expect(Customer.createAndValidate(customerProps)).rejects.toThrow(
      BadRequestException,
    );
  });
});
