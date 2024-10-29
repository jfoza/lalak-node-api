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
import { ProductCreateUseCase } from '@/features/product/application/use-cases/product-create.use-case';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { UUID } from '@/common/infra/utils/uuid';
import { Product } from '@/features/product/domain/core/product';
import { Category } from '@/features/category/domain/core/category';
import { Event } from '@/features/event/domain/core/event';

describe('ProductCreateUseCase Unit Tests', () => {
  let sut: ProductCreateUseCase;
  let productQueryRepository: ProductQueryRepository;
  let productCommandRepository: ProductCommandRepository;
  let categoryRepository: CategoryRepository;
  let eventRepository: EventRepository;
  let productCreateDto: ProductCreateDto;

  const categoryUuid = UUID.generate();
  const eventUuid = UUID.generate();

  beforeEach(() => {
    productQueryRepository = {
      findByName: vi.fn(),
    } as unknown as ProductQueryRepository;

    productCommandRepository = {
      create: vi.fn(),
      saveCategories: vi.fn(),
      saveEvents: vi.fn(),
    } as unknown as ProductCommandRepository;

    categoryRepository = {
      findByUuids: vi.fn(),
    } as unknown as CategoryRepository;

    eventRepository = {
      findByUuids: vi.fn(),
    } as unknown as EventRepository;

    sut = new ProductCreateUseCase(
      productQueryRepository,
      productCommandRepository,
      categoryRepository,
      eventRepository,
    );

    productCreateDto = new ProductCreateDto();
    productCreateDto.description = 'test';
    productCreateDto.details = 'test';
    productCreateDto.value = 10;
    productCreateDto.quantity = 59.9;
    productCreateDto.categories = [categoryUuid];
    productCreateDto.events = [eventUuid];

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.PRODUCTS_INSERT];
  });

  it('Should create a product', async () => {
    const product: Product = ProductsDataBuilder.getProduct();
    const category = await Category.create(
      ProductsDataBuilder.getCategoryProps(),
      categoryUuid,
    );
    const event = await Event.create(
      ProductsDataBuilder.getEventProps(),
      eventUuid,
    );

    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(productCommandRepository, 'create').mockResolvedValue(product);
    vi.spyOn(categoryRepository, 'findByUuids').mockResolvedValue([category]);
    vi.spyOn(eventRepository, 'findByUuids').mockResolvedValue([event]);

    const result = await sut.execute(productCreateDto);

    expect(productQueryRepository.findByName).toHaveBeenCalled();
    expect(categoryRepository.findByUuids).toHaveBeenCalled();
    expect(eventRepository.findByUuids).toHaveBeenCalled();
    expect(productCommandRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Product);
  });

  it('Should return exception if product name already exists', async () => {
    const product: Product = ProductsDataBuilder.getProduct();

    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(product);

    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.PRODUCT_NAME_ALREADY_EXISTS,
    );
  });

  it('Should return exception if category not exists', async () => {
    const category = await Category.create(
      ProductsDataBuilder.getCategoryProps(),
      categoryUuid,
    );

    productCreateDto.categories = [categoryUuid, UUID.generate()];

    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(categoryRepository, 'findByUuids').mockResolvedValue([category]);

    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.CATEGORY_NOT_FOUND,
    );
  });

  it('Should return exception if event not exists', async () => {
    const category = await Category.create(
      ProductsDataBuilder.getCategoryProps(),
      categoryUuid,
    );

    const event = await Event.create(
      ProductsDataBuilder.getEventProps(),
      eventUuid,
    );

    productCreateDto.events = [eventUuid, UUID.generate()];

    vi.spyOn(productQueryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(categoryRepository, 'findByUuids').mockResolvedValue([category]);
    vi.spyOn(eventRepository, 'findByUuids').mockResolvedValue([event]);

    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.EVENT_NOT_FOUND,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(productCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
