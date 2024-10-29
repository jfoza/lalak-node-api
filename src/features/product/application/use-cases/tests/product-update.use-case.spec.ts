import { beforeEach, vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { UUID } from '@/common/infra/utils/uuid';
import { Product } from '@/features/product/domain/core/product';
import { Category } from '@/features/category/domain/core/category';
import { Event } from '@/features/event/domain/core/event';
import { ProductUpdateUseCase } from '@/features/product/application/use-cases/product-update.use-case';
import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';

describe('ProductUpdateUseCase Unit Tests', () => {
  let sut: ProductUpdateUseCase;
  let productQueryRepository: ProductQueryRepository;
  let productCommandRepository: ProductCommandRepository;
  let categoryRepository: CategoryRepository;
  let eventRepository: EventRepository;
  let productUpdateDto: ProductUpdateDto;

  const categoryUuid = UUID.generate();
  const eventUuid = UUID.generate();

  beforeEach(() => {
    productQueryRepository = {
      findByUuid: vi.fn(),
      findByName: vi.fn(),
    } as unknown as ProductQueryRepository;

    productCommandRepository = {
      update: vi.fn(),
      saveCategories: vi.fn(),
      saveEvents: vi.fn(),
    } as unknown as ProductCommandRepository;

    categoryRepository = {
      findByUuids: vi.fn(),
    } as unknown as CategoryRepository;

    eventRepository = {
      findByUuids: vi.fn(),
    } as unknown as EventRepository;

    sut = new ProductUpdateUseCase(
      productQueryRepository,
      productCommandRepository,
      categoryRepository,
      eventRepository,
    );

    productUpdateDto = new ProductUpdateDto();
    productUpdateDto.description = 'test';
    productUpdateDto.details = 'test';
    productUpdateDto.value = 10;
    productUpdateDto.quantity = 59.9;
    productUpdateDto.categories = [categoryUuid];
    productUpdateDto.events = [eventUuid];

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.PRODUCTS_UPDATE];
  });

  it('Should update a product', async () => {
    const product: Product = ProductsDataBuilder.getProduct();
    const category = await Category.create(
      ProductsDataBuilder.getCategoryProps(),
      categoryUuid,
    );
    const event = await Event.create(
      ProductsDataBuilder.getEventProps(),
      eventUuid,
    );

    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(product);
    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(productCommandRepository, 'update').mockResolvedValue(product);
    vi.spyOn(categoryRepository, 'findByUuids').mockResolvedValue([category]);
    vi.spyOn(eventRepository, 'findByUuids').mockResolvedValue([event]);

    const result = await sut.execute(UUID.generate(), productUpdateDto);

    expect(productQueryRepository.findByUuid).toHaveBeenCalled();
    expect(productQueryRepository.findByName).toHaveBeenCalled();
    expect(categoryRepository.findByUuids).toHaveBeenCalled();
    expect(eventRepository.findByUuids).toHaveBeenCalled();
    expect(productCommandRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Product);
  });

  it('Should return exception if product not exists', async () => {
    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(null);

    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ErrorMessagesEnum.PRODUCT_NOT_FOUND);
  });

  it('Should return exception if product name already exists', async () => {
    const product1: Product = ProductsDataBuilder.getProduct();
    const product2: Product = ProductsDataBuilder.getProduct();

    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(product1);
    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(product2);

    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ConflictException);
    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ErrorMessagesEnum.PRODUCT_NAME_ALREADY_EXISTS);
  });

  it('Should return exception if category not exists', async () => {
    const product: Product = ProductsDataBuilder.getProduct();
    const category = await Category.create(
      ProductsDataBuilder.getCategoryProps(),
      categoryUuid,
    );

    productUpdateDto.categories = [categoryUuid, UUID.generate()];

    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(product);
    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(categoryRepository, 'findByUuids').mockResolvedValue([category]);

    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ErrorMessagesEnum.CATEGORY_NOT_FOUND);
  });

  it('Should return exception if event not exists', async () => {
    const product: Product = ProductsDataBuilder.getProduct();
    const category = await Category.create(
      ProductsDataBuilder.getCategoryProps(),
      categoryUuid,
    );
    const event = await Event.create(
      ProductsDataBuilder.getEventProps(),
      eventUuid,
    );

    productUpdateDto.events = [eventUuid, UUID.generate()];

    vi.spyOn(productQueryRepository, 'findByUuid').mockResolvedValue(product);
    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(categoryRepository, 'findByUuids').mockResolvedValue([category]);
    vi.spyOn(eventRepository, 'findByUuids').mockResolvedValue([event]);

    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ErrorMessagesEnum.EVENT_NOT_FOUND);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ForbiddenException);
    await expect(
      sut.execute(UUID.generate(), productUpdateDto),
    ).rejects.toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
  });
});
