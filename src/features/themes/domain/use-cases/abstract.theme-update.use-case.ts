import { Theme } from '@/features/themes/domain/core/theme';
import { UpdateThemeDto } from '@/features/themes/application/dto/update-theme.dto';

export abstract class AbstractThemeUpdateUseCase {
  abstract execute(
    uuid: string,
    updateThemeDto: UpdateThemeDto,
  ): Promise<Theme>;
}
