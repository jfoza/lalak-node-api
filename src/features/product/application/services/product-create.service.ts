import { AbstractProductCreateService } from '@/features/product/domain/services/abstract.product-create.service';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { Product } from '@/features/product/domain/core/product';
import { Inject, Injectable } from '@nestjs/common';
import { AbstractProductCreateUseCase } from '@/features/product/domain/use-cases/abstract.product-create.use-case';
import { AbstractUploadImageUseCase } from '@/upload/domain/use-cases/abstract.upload-image.use-case';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { File } from '@/upload/domain/entities/file';
import { AbstractProductCreateImageUseCase } from '@/features/product/domain/use-cases/abstract.product-create-image.use-case';
import { AbstractFileDto } from '@/upload/domain/dto/file.dto.interface';

@Injectable()
export class ProductCreateService
  extends Application
  implements AbstractProductCreateService
{
  constructor(
    @Inject(AbstractProductCreateUseCase)
    private readonly productCreateUseCase: AbstractProductCreateUseCase,

    @Inject(AbstractUploadImageUseCase)
    private readonly uploadImageUseCase: AbstractUploadImageUseCase,

    @Inject(AbstractProductCreateImageUseCase)
    private readonly productCreateImageUseCase: AbstractProductCreateImageUseCase,
  ) {
    super();
  }

  async handle(
    productCreateDto: ProductCreateDto,
    image?: AbstractFileDto,
  ): Promise<Product> {
    this.policy.can(AbilitiesEnum.PRODUCTS_INSERT);

    const product: Product =
      await this.productCreateUseCase.execute(productCreateDto);

    if (image) {
      const file: File = await this.uploadImageUseCase.execute(
        image,
        'images/products',
      );

      product.images = await this.productCreateImageUseCase.execute(product, [
        file,
      ]);
    }

    return product;
  }
}
