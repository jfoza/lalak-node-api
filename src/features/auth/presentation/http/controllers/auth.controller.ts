import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ILoginService } from '@/features/auth/domain/services/login.service.interface';
import { AuthDto } from '@/features/auth/application/dto/auth.dto';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import {
  HttpAdminAuthPresenter,
  IHttpAuthPresenter,
} from '@/features/auth/presentation/http/presenters/http.admin-auth.presenter';
import { HttpCustomerAuthPresenter } from '@/features/auth/presentation/http/presenters/http.customer-auth.presenter';

@Controller('auth')
export class AuthController {
  @Inject(ILoginService)
  private readonly authService: ILoginService;

  @Post('login/admin')
  @HttpCode(HttpStatus.OK)
  async createAdminLogin(
    @Body() authDto: AuthDto,
    @Req() request: Request,
  ): Promise<IHttpAuthPresenter> {
    authDto.ipAddress = request.ip;

    const result = await this.authService.handle(
      authDto,
      LoginUserTypesEnum.ADMIN,
    );

    return HttpAdminAuthPresenter.toHTTP().from(result);
  }

  @Post('login/customer')
  @HttpCode(HttpStatus.OK)
  async createCustomerLogin(
    @Body() authDto: AuthDto,
    @Req() request: Request,
  ): Promise<IHttpAuthPresenter> {
    authDto.ipAddress = request.ip;

    const result = await this.authService.handle(
      authDto,
      LoginUserTypesEnum.CUSTOMER,
    );

    return HttpCustomerAuthPresenter.toHTTP().from(result);
  }
}
