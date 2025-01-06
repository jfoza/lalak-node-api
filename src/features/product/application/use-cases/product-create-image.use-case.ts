import { Product } from '@/features/product/domain/entities/product';
import { File } from '@/upload/domain/entities/file';
import { Inject, Injectable } from '@nestjs/common';
import { Image, ImageProps } from '@/features/image/domain/entities/image';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { ImageTypeEnum } from '@/utils/enums/image-type.enum';
import { IProductCreateImageUseCase } from '@/features/product/domain/use-cases/product-create-image.use-case';
import { IImageRepository } from '@/features/image/domain/repositories/image.repository';

@Injectable()
export class ProductCreateImageUseCase implements IProductCreateImageUseCase {
  constructor(
    @Inject(IImageRepository)
    private readonly imageRepository: IImageRepository,

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

    // product.images = images;

    await this.imageRepository.save(images);
    // await this.productCommandRepository.saveImages(product);

    return images;
  }
}
