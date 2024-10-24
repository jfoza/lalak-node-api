import { Theme } from '@/features/theme/domain/core/theme';

export abstract class AbstractThemeListByUuidUseCase {
  abstract execute(uuid: string): Promise<Theme>;
}
