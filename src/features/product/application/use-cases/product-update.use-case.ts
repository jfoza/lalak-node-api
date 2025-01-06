import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';
import { Product } from '@/features/product/domain/entities/product';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { ProductValidations } from '@/features/product/application/validations/product.validations';
import { Category } from '@/features/category/domain/entities/category';
import { CategoryValidations } from '@/features/category/application/validations/category.validations';
import { Event } from '@/features/event/domain/entities/event';
import { EventValidations } from '@/features/event/application/validations/event.validations';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { IProductUpdateUseCase } from '@/features/product/domain/use-cases/product-update.use-case';
import { UniqueName } from '@/common/domain/value-objects/unique-name';

@Injectable()
export class ProductUpdateUseCase
  extends Application
  implements IProductUpdateUseCase
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

  async execute(
    uuid: string,
    productUpdateDto: ProductUpdateDto,
  ): Promise<Product> {
    this.policy.can(AbilitiesEnum.PRODUCTS_UPDATE);

    const product = await ProductValidations.productExists(
      uuid,
      this.productQueryRepository,
    );

    await ProductValidations.productExistsByNameInUpdate(
      uuid,
      productUpdateDto.description,
      this.productQueryRepository,
    );

    let categories: Category[] = [];
    let events: Event[] = [];

    if (productUpdateDto.categories.length > 0) {
      categories = await CategoryValidations.categoriesExists(
        productUpdateDto.categories,
        this.categoryRepository,
      );
    }

    if (productUpdateDto.events.length > 0) {
      events = await EventValidations.eventsExists(
        productUpdateDto.events,
        this.eventRepository,
      );
    }

    product.description = productUpdateDto.description;
    product.details = productUpdateDto.details;
    product.uniqueName = UniqueName.createFrom(productUpdateDto.description);
    product.value = productUpdateDto.value;
    product.quantity = productUpdateDto.quantity;
    product.balance = productUpdateDto.quantity;
    // product.categories = categories;
    // product.events = events;

    await this.productCommandRepository.update(product);
    // await this.productCommandRepository.saveCategories(product);
    // await this.productCommandRepository.saveEvents(product);

    return product;
  }
}
