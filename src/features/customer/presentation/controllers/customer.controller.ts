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
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ICustomerListUseCase } from '@/features/customer/domain/use-cases/customer-list.use-case.interface';
import { customerSearchParamsDto } from '@/features/customer/application/dto/customer-search-params.dto';
import { CreateCustomerDto } from '@/features/customer/application/dto/create-customer.dto';
import { ICustomerCreateUseCase } from '@/features/customer/domain/use-cases/customer-create.use-case.interface';
import { User } from '@/features/user/domain/entities/user';
import { ICustomerListByIdUseCase } from '@/features/customer/domain/use-cases/customer-list-by-id.use-case.interface';
import { UpdateCustomerDto } from '@/features/customer/application/dto/update-customer.dto';
import { ICustomerUpdateUseCase } from '@/features/customer/domain/use-cases/customer-update.use-case.interface';
import { IManyCustomersCreateUseCase } from '@/features/customer/domain/use-cases/many-customers-create.use-case.interface';
import { ZodValidationPipe } from '@/common/presentation/zod/validation-pipes/zod.validation-pipe';
import { TPaginationOrder } from '@/common/presentation/types/pagination-order.type';
import { customerSearchParamsDtoSchema } from '@/features/customer/presentation/zod/schemas';

type TCustomerSearchParams = {
  name?: string;
  email?: string;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/customers')
export class CustomerController {
  @Inject(ICustomerListUseCase)
  private readonly customerListUseCase: ICustomerListUseCase;

  @Inject(ICustomerListByIdUseCase)
  private readonly customerListByIdUseCase: ICustomerListByIdUseCase;

  @Inject(ICustomerCreateUseCase)
  private readonly customerCreateUseCase: ICustomerCreateUseCase;

  @Inject(IManyCustomersCreateUseCase)
  private readonly manyCustomersCreateUseCase: IManyCustomersCreateUseCase;

  @Inject(ICustomerUpdateUseCase)
  private readonly customerUpdateUseCase: ICustomerUpdateUseCase;

  @Get()
  async index(
    @Query(new ZodValidationPipe(customerSearchParamsDtoSchema))
    query: TCustomerSearchParams,
  ): Promise<ILengthAwarePaginator> {
    customerSearchParamsDto.name = query.name;
    customerSearchParamsDto.email = query.email;

    customerSearchParamsDto.paginationOrder.page = query.page;
    customerSearchParamsDto.paginationOrder.perPage = query.perPage;
    customerSearchParamsDto.paginationOrder.columnOrder = query.columnOrder;
    customerSearchParamsDto.paginationOrder.columnName = query.columnName;

    return await this.customerListUseCase.execute(customerSearchParamsDto);
  }

  @Get(':uuid')
  async show(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<User> {
    return await this.customerListByIdUseCase.execute(uuid);
  }

  @Post()
  async insert(@Body() createCustomerDto: CreateCustomerDto): Promise<User> {
    return await this.customerCreateUseCase.execute(createCustomerDto);
  }

  @Post('many')
  async insertMany(): Promise<{ status: string }> {
    await this.manyCustomersCreateUseCase.execute();

    return { status: 'OK' };
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<User> {
    return await this.customerUpdateUseCase.execute(uuid, updateCustomerDto);
  }
}
