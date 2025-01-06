import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { Product } from '@/features/product/domain/entities/product';
import { Inject, Injectable } from '@nestjs/common';
import { AbstractUploadImageUseCase } from '@/upload/domain/use-cases/abstract.upload-image.use-case';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { File } from '@/upload/domain/entities/file';
import { AbstractFileDto } from '@/upload/domain/dto/file.dto.interface';
import { IProductCreateUseCase } from '@/features/product/domain/use-cases/product-create.use-case';
import { IProductCreateService } from '@/features/product/domain/services/product-create.service';
import { IProductCreateImageUseCase } from '@/features/product/domain/use-cases/product-create-image.use-case';

@Injectable()
export class ProductCreateService
  extends Application
  implements IProductCreateService
{
  constructor(
    @Inject(IProductCreateUseCase)
    private readonly productCreateUseCase: IProductCreateUseCase,

    @Inject(AbstractUploadImageUseCase)
    private readonly uploadImageUseCase: AbstractUploadImageUseCase,

    // @Inject(IProductCreateImageUseCase)
    // private readonly productCreateImageUseCase: IProductCreateImageUseCase,
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

    // if (image) {
    //   const file: File = await this.uploadImageUseCase.execute(
    //     image,
    //     'images/products',
    //   );
    //
    //   product.images = await this.productCreateImageUseCase.execute(product, [
    //     file,
    //   ]);
    // }

    return product;
  }
}
