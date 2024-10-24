export abstract class AbstractProductRemoveUseCase {
  abstract execute(uuid: string): Promise<void>;
}
