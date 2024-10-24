export abstract class AbstractThemeRemoveUseCase {
  abstract execute(uuid: string): Promise<void>;
}
