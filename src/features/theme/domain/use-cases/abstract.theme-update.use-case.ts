import { Theme } from '@/features/theme/domain/core/theme';
import { UpdateThemeDto } from '@/features/theme/application/dto/update-theme.dto';

export abstract class AbstractThemeUpdateUseCase {
  abstract execute(
    uuid: string,
    updateThemeDto: UpdateThemeDto,
  ): Promise<Theme>;
}
