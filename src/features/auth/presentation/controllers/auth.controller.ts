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
import { IAuthResponse } from '@/features/auth/domain/dto/auth.response.dto.interface';

@Controller('auth')
export class AuthController {
  @Inject(ILoginService)
  private readonly authService: ILoginService;

  @Post('login/customer')
  @HttpCode(HttpStatus.OK)
  async createCustomerLogin(
    @Body() authDto: AuthDto,
    @Req() request: Request,
  ): Promise<IAuthResponse> {
    authDto.ipAddress = request.ip;

    return this.authService.handle(authDto, LoginUserTypesEnum.CUSTOMER);
  }

  @Post('login/admin')
  @HttpCode(HttpStatus.OK)
  async createAdminLogin(
    @Body() authDto: AuthDto,
    @Req() request: Request,
  ): Promise<IAuthResponse> {
    authDto.ipAddress = request.ip;

    return this.authService.handle(authDto, LoginUserTypesEnum.ADMIN);
  }
}
