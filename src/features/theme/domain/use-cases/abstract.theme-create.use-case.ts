import { Theme } from '@/features/theme/domain/core/theme';
import { CreateThemeDto } from '@/features/theme/application/dto/create-theme.dto';

export abstract class AbstractThemeCreateUseCase {
  abstract execute(createThemeDto: CreateThemeDto): Promise<Theme>;
}
