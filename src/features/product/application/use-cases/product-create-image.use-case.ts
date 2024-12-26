import { AbstractProductCreateImageUseCase } from '@/features/product/domain/use-cases/abstract.product-create-image.use-case';
import { Product } from '@/features/product/domain/core/product';
import { File } from '@/upload/domain/entities/file';
import { Inject, Injectable } from '@nestjs/common';
import { Image, ImageProps } from '@/features/image/domain/core/image';
import { AbstractImageRepository } from '@/features/image/domain/repositories/abstract.image.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { ImageTypeEnum } from '@/utils/enums/image-type.enum';

@Injectable()
export class ProductCreateImageUseCase
  implements AbstractProductCreateImageUseCase
{
  constructor(
    @Inject(AbstractImageRepository)
    private readonly imageRepository: AbstractImageRepository,

    @Inject(ProductCommandRepository)
    private readonly productCommandRepository: ProductCommandRepository,
  ) {}

  async execute(product: Product, files: File[]): Promise<Image[]> {
    const images: Image[] = await Promise.all(
      files.map(async (file: File): Promise<Image> => {
        return await Image.create({
          path: file.filename,
          type: ImageTypeEnum.PRODUCT,
        } as ImageProps);
      }),
    );

    product.images = images;

    await this.imageRepository.save(images);
    await this.productCommandRepository.saveImages(product);

    return images;
  }
}
