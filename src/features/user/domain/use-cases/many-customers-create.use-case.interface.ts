export interface IManyCustomersCreateUseCase {
  execute(): Promise<void>;
}

export const IManyCustomersCreateUseCase = Symbol(
  'IManyCustomersCreateUseCase',
);
