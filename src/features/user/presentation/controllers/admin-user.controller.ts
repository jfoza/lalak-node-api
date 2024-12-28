import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/infra/config/auth.guard';
import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { adminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { IAdminUserListById } from '@/features/user/domain/use-cases/admin-user-list-by-id.use-case.interface';
import { User } from '@/features/user/domain/entities/user';
import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';
import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { UpdateAdminUserDto } from '@/features/user/application/dto/update-admin-user.dto';
import { ZodValidationPipe } from '@/common/presentation/zod/validation-pipes/zod.validation-pipe';
import { adminUserSearchParamsDtoSchema } from '@/features/user/presentation/zod/schemas';
import { TPaginationOrder } from '@/common/presentation/types/pagination-order.type';

type TAdminUserSearchParams = {
  name?: string;
  email?: string;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/users')
export class AdminUserController {
  @Inject(IAdminUserListUseCase)
  private readonly adminUserListUseCase: IAdminUserListUseCase;

  @Inject(IAdminUserListById)
  private readonly adminUserListById: IAdminUserListById;

  @Inject(IAdminUserCreateUseCase)
  private readonly adminUserCreateUseCase: IAdminUserCreateUseCase;

  @Inject(IAdminUserUpdateUseCase)
  private readonly adminUserUpdateUseCase: IAdminUserUpdateUseCase;

  @Get()
  async index(
    @Query(new ZodValidationPipe(adminUserSearchParamsDtoSchema))
    query: TAdminUserSearchParams,
  ): Promise<ILengthAwarePaginator> {
    adminUserSearchParamsDto.name = query.name;
    adminUserSearchParamsDto.email = query.email;

    adminUserSearchParamsDto.paginationOrderParams.page = query.page;
    adminUserSearchParamsDto.paginationOrderParams.perPage = query.perPage;
    adminUserSearchParamsDto.paginationOrderParams.columnOrder =
      query.columnOrder;
    adminUserSearchParamsDto.paginationOrderParams.columnName =
      query.columnName;

    return await this.adminUserListUseCase.execute(adminUserSearchParamsDto);
  }

  @Get(':uuid')
  async show(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<User> {
    return await this.adminUserListById.execute(uuid);
  }

  @Post()
  async insert(@Body() createAdminUserDto: CreateAdminUserDto): Promise<User> {
    return await this.adminUserCreateUseCase.execute(createAdminUserDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<User> {
    return await this.adminUserUpdateUseCase.execute(uuid, updateAdminUserDto);
  }
}
