export abstract class AbstractCategoryRemoveUseCase {
  abstract execute(uuid: string): Promise<void>;
}
