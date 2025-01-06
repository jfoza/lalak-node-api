import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  Product,
  ProductProps,
} from '@/features/product/domain/entities/product';
import { UniqueName } from '@/common/domain/value-objects/unique-name';
import {
  ProductCategory,
  ProductCategoryProps,
} from '@/features/product/domain/entities/product-category';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import {
  ProductEvent,
  ProductEventProps,
} from '@/features/product/domain/entities/product-event';
import {
  ProductImage,
  ProductImageProps,
} from '@/features/product/domain/entities/product-image';

describe('Product Domain Entity Unit Tests', () => {
  let sut: Product;
  let props: ProductProps;

  beforeEach(async () => {
    props = ProductsDataBuilder.getProductProps();

    sut = Product.create(props);
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
    expect(sut.uniqueName).toEqual(props.uniqueName.toValue());
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
    sut.description = 'new';
    expect(sut.props.description).toEqual('new');
    expect(typeof sut.props.description).toBe('string');
  });

  it('Setter of details field', () => {
    sut.details = 'new';
    expect(sut.props.details).toEqual('new');
    expect(typeof sut.props.details).toBe('string');
  });

  it('Setter of uniqueName field', () => {
    sut.uniqueName = UniqueName.createFrom('Test Product Name');
    expect(sut.uniqueName).toEqual('test-product-name');
    expect(sut.props.uniqueName).toBeInstanceOf(UniqueName);
  });

  it('Setter of value field', () => {
    sut.value = 10;
    expect(sut.props.value).toEqual(10);
    expect(typeof sut.props.value).toBe('number');
  });

  it('Setter of quantity field', () => {
    sut.quantity = 10;
    expect(sut.props.quantity).toEqual(10);
    expect(typeof sut.props.quantity).toBe('number');
  });

  it('Setter of categories field', () => {
    sut.categories = [
      ProductCategory.create({
        productUuid: UniqueEntityId.create(),
        categoryUuid: UniqueEntityId.create(),
      } as ProductCategoryProps),
    ];

    sut.categories.forEach((category) => {
      expect(category).toBeInstanceOf(ProductCategory);
    });

    expect(
      sut.categories.every((category) => category instanceof ProductCategory),
    ).toBe(true);
  });

  it('Setter of events field', () => {
    sut.events = [
      ProductEvent.create({
        productUuid: UniqueEntityId.create(),
        eventUuid: UniqueEntityId.create(),
      } as ProductEventProps),
    ];

    sut.categories.forEach((event) => {
      expect(event).toBeInstanceOf(ProductEvent);
    });

    expect(sut.categories.every((event) => event instanceof ProductEvent)).toBe(
      true,
    );
  });

  it('Setter of images field', () => {
    sut.images = [
      ProductImage.create({
        productUuid: UniqueEntityId.create(),
        imageUuid: UniqueEntityId.create(),
      } as ProductImageProps),
    ];

    sut.categories.forEach((image) => {
      expect(image).toBeInstanceOf(ProductImage);
    });

    expect(sut.categories.every((image) => image instanceof ProductImage)).toBe(
      true,
    );
  });

  it('Setter of active field', () => {
    sut.active = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });
});
