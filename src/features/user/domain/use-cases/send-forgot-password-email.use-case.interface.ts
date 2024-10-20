export interface ISendForgotPasswordEmailUseCase {
  execute(email: string): Promise<void>;
}
