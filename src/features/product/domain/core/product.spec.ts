import { UUID } from '@/common/infra/utils/uuid';
import { ProductsDataBuilder } from '../../../../../test/unit/products-data-builder';
import { Product, ProductProps } from '@/features/product/domain/core/product';
import { BadRequestException } from '@nestjs/common';

describe('Product Domain Entity Unit Tests', () => {
  let sut: Product;
  let props: ProductProps;

  beforeEach(async () => {
    props = ProductsDataBuilder.getProductProps();

    sut = new Product(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.details).toEqual(props.details);
    expect(sut.props.uniqueName).toEqual(props.uniqueName);
    expect(sut.props.value).toEqual(props.value);
    expect(sut.props.quantity).toEqual(props.quantity);
    expect(sut.props.balance).toEqual(props.balance);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of description field', () => {
    expect(sut.description).toBeDefined();
    expect(sut.description).toEqual(props.description);
    expect(typeof sut.description).toBe('string');
  });

  it('Getter of details field', () => {
    expect(sut.details).toBeDefined();
    expect(sut.details).toEqual(props.details);
    expect(typeof sut.details).toBe('string');
  });

  it('Getter of uniqueName field', () => {
    expect(sut.uniqueName).toBeDefined();
    expect(sut.uniqueName).toEqual(props.uniqueName);
    expect(typeof sut.uniqueName).toBe('string');
  });

  it('Getter of value field', () => {
    expect(sut.value).toBeDefined();
    expect(sut.value).toEqual(props.value);
    expect(typeof sut.value).toBe('number');
  });

  it('Getter of quantity field', () => {
    expect(sut.quantity).toBeDefined();
    expect(sut.quantity).toEqual(props.quantity);
    expect(typeof sut.quantity).toBe('number');
  });

  it('Getter of balance field', () => {
    expect(sut.balance).toBeDefined();
    expect(sut.balance).toEqual(props.balance);
    expect(typeof sut.balance).toBe('number');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Setter of description field', () => {
    sut['description'] = 'new';
    expect(sut.props.description).toEqual('new');
    expect(typeof sut.props.description).toBe('string');
  });

  it('Setter of details field', () => {
    sut['details'] = 'new';
    expect(sut.props.details).toEqual('new');
    expect(typeof sut.props.details).toBe('string');
  });

  it('Setter of uniqueName field', () => {
    sut['uniqueName'] = 'new';
    expect(sut.props.uniqueName).toEqual('new');
    expect(typeof sut.props.uniqueName).toBe('string');
  });

  it('Setter of value field', () => {
    sut['value'] = 10;
    expect(sut.props.value).toEqual(10);
    expect(typeof sut.props.value).toBe('number');
  });

  it('Setter of quantity field', () => {
    sut['quantity'] = 10;
    expect(sut.props.quantity).toEqual(10);
    expect(typeof sut.props.quantity).toBe('number');
  });

  it('Setter of balance field', () => {
    sut['quantity'] = 10;
    sut['balance'] = 10;
    expect(sut.props.balance).toEqual(10);
    expect(typeof sut.props.balance).toBe('number');
  });

  it('Setter of active field', () => {
    sut['active'] = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });

  it('createValidated method should to instance new Product class', async () => {
    const uuid = UUID.generate();
    const productProps = ProductsDataBuilder.getProductProps();

    const productClass = await Product.create(productProps, uuid);

    expect(productClass).toBeInstanceOf(Product);
    expect(productClass.uuid).toEqual(uuid);
  });

  it('createValidated method should return exception if value is less than zero', async () => {
    const productProps = ProductsDataBuilder.getProductProps();
    productProps.value = -1;

    await expect(Product.createValidated(productProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createValidated method should return exception if quantity is less than zero', async () => {
    const productProps = ProductsDataBuilder.getProductProps();
    productProps.quantity = -1;

    await expect(Product.createValidated(productProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createValidated method should return exception if balance is less than zero', async () => {
    const productProps = ProductsDataBuilder.getProductProps();
    productProps.balance = -1;

    await expect(Product.createValidated(productProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createValidated method should return exception if balance is greater than quantity', async () => {
    const productProps = ProductsDataBuilder.getProductProps();
    productProps.quantity = 10;
    productProps.balance = 20;

    await expect(Product.createValidated(productProps)).rejects.toThrow(
      BadRequestException,
    );
  });
});
