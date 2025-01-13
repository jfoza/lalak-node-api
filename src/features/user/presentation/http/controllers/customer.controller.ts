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
import { customerSearchParamsDto } from '@/features/user/application/dto/customer-search-params.dto';
import { CustomerUpdateDto } from '@/features/user/application/dto/customer-update.dto';
import { ZodValidationPipe } from '@/common/presentation/http/zod/validation-pipes/zod.validation-pipe';
import { TPaginationOrder } from '@/common/presentation/http/types/pagination-order.type';
import { ICustomerListService } from '@/features/user/domain/services/customer-list.service';
import { ICustomerListByUuidService } from '@/features/user/domain/services/customer-list-by-uuid.service';
import { ICustomerCreateService } from '@/features/user/domain/services/customer-create.service';
import { ICustomerUpdateService } from '@/features/user/domain/services/customer-update.service';
import { customerSearchParamsDtoSchema } from '@/features/user/presentation/http/zod/schemas';
import { CustomerCreateDto } from '@/features/user/application/dto/create-customer.dto';
import { User } from '@/features/user/domain/entities/user';

type TCustomerSearchParams = {
  name?: string;
  email?: string;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/customers')
export class CustomerController {
  @Inject(ICustomerListService)
  private readonly customerListService: ICustomerListService;

  @Inject(ICustomerListByUuidService)
  private readonly customerListByUuidService: ICustomerListByUuidService;

  @Inject(ICustomerCreateService)
  private readonly customerCreateService: ICustomerCreateService;

  @Inject(ICustomerUpdateService)
  private readonly customerUpdateService: ICustomerUpdateService;

  @Get()
  async index(
    @Query(new ZodValidationPipe(customerSearchParamsDtoSchema))
    query: TCustomerSearchParams,
  ): Promise<User[]> {
    customerSearchParamsDto.name = query.name;
    customerSearchParamsDto.email = query.email;

    customerSearchParamsDto.paginationOrder.page = query.page;
    customerSearchParamsDto.paginationOrder.perPage = query.perPage;
    customerSearchParamsDto.paginationOrder.columnOrder = query.columnOrder;
    customerSearchParamsDto.paginationOrder.columnName = query.columnName;

    return await this.customerListService.execute(customerSearchParamsDto);
  }

  @Get(':uuid')
  async show(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<User> {
    return await this.customerListByUuidService.execute(uuid);
  }

  @Post()
  async insert(@Body() createCustomerDto: CustomerCreateDto): Promise<User> {
    return await this.customerCreateService.execute(createCustomerDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateCustomerDto: CustomerUpdateDto,
  ): Promise<User> {
    return await this.customerUpdateService.execute(uuid, updateCustomerDto);
  }
}
