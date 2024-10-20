import { Theme } from '@/features/themes/domain/core/theme';
import { CreateThemeDto } from '@/features/themes/application/dto/create-theme.dto';

export abstract class AbstractThemeCreateUseCase {
  abstract execute(createThemeDto: CreateThemeDto): Promise<Theme>;
}
