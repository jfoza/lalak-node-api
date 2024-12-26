export interface IResetPasswordUseCase {
  execute(token: string, newPassword: string): Promise<void>;
}

export const IResetPasswordUseCase = Symbol('IResetPasswordUseCase');
