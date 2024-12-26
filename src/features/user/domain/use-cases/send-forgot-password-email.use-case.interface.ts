export interface ISendForgotPasswordEmailUseCase {
  execute(email: string): Promise<void>;
}

export const ISendForgotPasswordEmailUseCase = Symbol(
  'ISendForgotPasswordEmailUseCase',
);
