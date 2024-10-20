import { Theme } from '@/features/themes/domain/core/theme';

export abstract class AbstractThemeListByUuidUseCase {
  abstract execute(uuid: string): Promise<Theme>;
}
