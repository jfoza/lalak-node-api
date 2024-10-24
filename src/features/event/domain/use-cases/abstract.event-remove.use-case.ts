export abstract class AbstractEventRemoveUseCase {
  abstract execute(uuid: string): Promise<void>;
}
