import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
  Put,
  Param,
} from '@nestjs/common';
import { IResetPasswordUseCase } from '@/features/user/domain/use-cases/reset-password.use-case.interface';
import { ISendForgotPasswordEmailUseCase } from '@/features/user/domain/use-cases/send-forgot-password-email.use-case.interface';
import { ZodValidationPipe } from '@/common/presentation/zod/validation-pipes/zod.validation-pipe';
import {
  emailSchema,
  updatePasswordSchema,
  uuidSchema,
} from '@/common/presentation/zod/schemas';

@Controller('password')
export class ForgotPasswordController {
  @Inject('ISendForgotPasswordEmailUseCase')
  private readonly sendForgotPasswordEmailUseCase: ISendForgotPasswordEmailUseCase;

  @Inject('IResetPasswordUseCase')
  private readonly resetPasswordUseCase: IResetPasswordUseCase;

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot')
  async create(
    @Body(new ZodValidationPipe(emailSchema)) body: { email: string },
  ): Promise<void> {
    const { email } = body;

    await this.sendForgotPasswordEmailUseCase.execute(email);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('reset/:token')
  async update(
    @Param('token', new ZodValidationPipe(uuidSchema)) token: string,
    @Body(new ZodValidationPipe(updatePasswordSchema))
    body: { password: string },
  ): Promise<void> {
    const { password } = body;

    return await this.resetPasswordUseCase.execute(token, password);
  }
}
