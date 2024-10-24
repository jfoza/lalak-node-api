import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { Theme } from '@/features/theme/domain/core/theme';
import { ThemeSearchParams } from '@/features/theme/domain/core/theme-search-params';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ThemeMapper } from '@/features/theme/infra/database/typeorm/mappers/theme.mapper';
import { toPaginate } from '@/common/infra/database/typeorm/pagination';

@Injectable()
export class TypeormThemeRepository implements ThemeRepository {
  @InjectRepository(ThemeEntity)
  private readonly themeEntityRepository: Repository<ThemeEntity>;

  @Inject(ThemeMapper)
  private readonly themeMapper: ThemeMapper;

  async findAll(themeSearchParams: ThemeSearchParams): Promise<Theme[]> {
    const results = await this.getBaseQuery(themeSearchParams).getMany();

    return this.themeMapper.collection(results);
  }

  async paginate(
    themeSearchParams: ThemeSearchParams,
  ): Promise<ILengthAwarePaginator> {
    const result = await toPaginate<ThemeEntity>(
      this.getBaseQuery(themeSearchParams),
      {
        page: themeSearchParams.page,
        perPage: themeSearchParams.perPage,
      },
    );

    result.data = await this.themeMapper.collection(result.data);

    return result;
  }

  async findByName(description: string): Promise<Theme | null> {
    const result = await this.themeEntityRepository.findOne({
      where: { description },
    });

    return this.themeMapper.optional(result);
  }

  async findByUuid(uuid: string): Promise<Theme | null> {
    const result = await this.themeEntityRepository.findOne({
      where: { uuid },
      relations: ['categories'],
    });

    return this.themeMapper.optional(result);
  }

  async create(theme: Theme): Promise<Theme> {
    const themeEntity = this.themeEntityRepository.create({
      uuid: theme.uuid,
      description: theme.description,
      active: theme.active,
      created_at: theme.createdAt,
    });

    await this.themeEntityRepository.save(themeEntity);

    return theme;
  }

  async update(theme: Theme): Promise<Theme> {
    await this.themeEntityRepository.update(theme.uuid, {
      uuid: theme.uuid,
      description: theme.description,
      active: theme.active,
    });

    return theme;
  }

  async remove(uuid: string): Promise<void> {
    await this.themeEntityRepository.delete(uuid);
  }

  private getBaseQuery(
    themeSearchParams: ThemeSearchParams,
  ): SelectQueryBuilder<ThemeEntity> {
    return this.themeEntityRepository
      .createQueryBuilder('theme')
      .when(themeSearchParams.description, (qb, description) =>
        qb.andWhere('theme.description ILIKE :description', {
          description: `%${description}%`,
        }),
      );
  }
}
