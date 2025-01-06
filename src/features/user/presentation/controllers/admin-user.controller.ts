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
import { adminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { AdminUserCreateDto } from '@/features/user/application/dto/admin-user-create.dto';
import { AdminUserUpdateDto } from '@/features/user/application/dto/admin-user-update.dto';
import { ZodValidationPipe } from '@/common/presentation/zod/validation-pipes/zod.validation-pipe';
import { adminUserSearchParamsDtoSchema } from '@/features/user/presentation/zod/schemas';
import { TPaginationOrder } from '@/common/presentation/types/pagination-order.type';
import { IAdminUserListByUuidService } from '@/features/user/domain/services/admin-user-list-by-uuid.service';
import { IAdminUserCreateService } from '@/features/user/domain/services/admin-user-create.service';
import { IAdminUserUpdateService } from '@/features/user/domain/services/admin-user-update.service';
import { IAdminUserListService } from '@/features/user/domain/services/admin-user-list.service';
import { Person } from '@/features/user/domain/entities/person';

type TAdminUserSearchParams = {
  name?: string;
  email?: string;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/users')
export class AdminUserController {
  @Inject(IAdminUserListService)
  private readonly adminUserListService: IAdminUserListService;

  @Inject(IAdminUserListByUuidService)
  private readonly adminUserListByUuidService: IAdminUserListByUuidService;

  @Inject(IAdminUserCreateService)
  private readonly adminUserCreateService: IAdminUserCreateService;

  @Inject(IAdminUserUpdateService)
  private readonly adminUserUpdateService: IAdminUserUpdateService;

  @Get()
  async index(
    @Query(new ZodValidationPipe(adminUserSearchParamsDtoSchema))
    query: TAdminUserSearchParams,
  ): Promise<Person[]> {
    adminUserSearchParamsDto.name = query.name;
    adminUserSearchParamsDto.email = query.email;

    adminUserSearchParamsDto.paginationOrderParams.page = query.page;
    adminUserSearchParamsDto.paginationOrderParams.perPage = query.perPage;
    adminUserSearchParamsDto.paginationOrderParams.columnOrder =
      query.columnOrder;
    adminUserSearchParamsDto.paginationOrderParams.columnName =
      query.columnName;

    return await this.adminUserListService.handle(adminUserSearchParamsDto);
  }

  @Get(':uuid')
  async show(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<Person> {
    return await this.adminUserListByUuidService.handle(uuid);
  }

  @Post()
  async insert(
    @Body() createAdminUserDto: AdminUserCreateDto,
  ): Promise<Person> {
    return await this.adminUserCreateService.handle(createAdminUserDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateAdminUserDto: AdminUserUpdateDto,
  ): Promise<Person> {
    return await this.adminUserUpdateService.handle(uuid, updateAdminUserDto);
  }
}
