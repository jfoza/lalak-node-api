import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { Theme, ThemeProps } from '@/features/themes/domain/core/theme';
import { ThemeEntity } from '@/features/themes/infra/database/typeorm/entities/theme.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThemeMapper extends Mapper<ThemeEntity, Theme, ThemeProps> {
  protected snakeCaseMapper: boolean = true;

  protected toDomainEntity(props: ThemeProps, uuid: string): Promise<Theme> {
    return Theme.create(props, uuid);
  }
}
