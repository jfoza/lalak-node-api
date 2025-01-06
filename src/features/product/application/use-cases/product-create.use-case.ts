import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import {
  Product,
  ProductProps,
} from '@/features/product/domain/entities/product';
import { Inject, Injectable } from '@nestjs/common';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { ProductValidations } from '@/features/product/application/validations/product.validations';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { Category } from '@/features/category/domain/entities/category';
import { Event } from '@/features/event/domain/entities/event';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { IProductCreateUseCase } from '@/features/product/domain/use-cases/product-create.use-case';
import { UniqueName } from '@/common/domain/value-objects/unique-name';

@Injectable()
export class ProductCreateUseCase implements IProductCreateUseCase {
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,

    @Inject(ProductCommandRepository)
    private readonly productCommandRepository: ProductCommandRepository,

    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,

    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  async execute(productCreateDto: ProductCreateDto): Promise<Product> {
    await ProductValidations.productExistsByName(
      productCreateDto.description,
      this.productQueryRepository,
    );

    let categories: Category[] = [];
    let events: Event[] = [];

    if (productCreateDto.categories.length > 0) {
      categories = await CategoryValidations.categoriesExists(
        productCreateDto.categories,
        this.categoryRepository,
      );
    }

    if (productCreateDto.events.length > 0) {
      events = await EventValidations.eventsExists(
        productCreateDto.events,
        this.eventRepository,
      );
    }

    const product: Product = Product.createFrom({
      description: productCreateDto.description,
      details: productCreateDto.details,
      uniqueName: UniqueName.createFrom(productCreateDto.description),
      value: productCreateDto.value,
      quantity: productCreateDto.quantity,
      balance: productCreateDto.quantity,
      active: true,
      // categories,
      // events,
    } as ProductProps);

    await this.productCommandRepository.create(product);
    // await this.productCommandRepository.saveCategories(product);
    // await this.productCommandRepository.saveEvents(product);

    return product;
  }
}
