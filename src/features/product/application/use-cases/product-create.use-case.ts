import { AbstractProductCreateUseCase } from '@/features/product/domain/use-cases/abstract.product-create.use-case';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { Product, ProductProps } from '@/features/product/domain/core/product';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/use-cases/application';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { ProductValidations } from '@/features/product/application/validations/product.validations';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { Category } from '@/features/category/domain/core/category';
import { Event } from '@/features/event/domain/core/event';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { Helper } from '@/common/infra/helpers';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

@Injectable()
export class ProductCreateUseCase
  extends Application
  implements AbstractProductCreateUseCase
{
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,

    @Inject(ProductCommandRepository)
    private readonly productCommandRepository: ProductCommandRepository,

    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,

    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {
    super();
  }

  async execute(productCreateDto: ProductCreateDto): Promise<Product> {
    this.policy.can(AbilitiesEnum.PRODUCTS_INSERT);

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

    const product: Product = await Product.createValidated({
      description: productCreateDto.description,
      details: productCreateDto.details,
      uniqueName: Helper.stringUniqueName(productCreateDto.description),
      value: productCreateDto.value,
      quantity: productCreateDto.quantity,
      balance: productCreateDto.quantity,
      active: true,
      categories,
      events,
    } as ProductProps);

    await this.productCommandRepository.create(product);
    await this.productCommandRepository.saveCategories(product);
    await this.productCommandRepository.saveEvents(product);

    return product;
  }
}
