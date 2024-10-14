import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  IsEnum,
} from 'class-validator';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';
import { Transform } from 'class-transformer';
import { Helper } from 'src/common/infra/helpers';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'The birthDate field must be in the format yyyy-mm-dd',
  })
  birthDate: string;

  @Transform(({ value }) => Helper.removeSpecialCharacters(value))
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10,11}$/, {
    message: 'The phone field must contain 10 to 11 digits',
  })
  phone: string;

  @Transform(({ value }) => Helper.removeSpecialCharacters(value))
  @IsNotEmpty()
  @IsString()
  @Length(8, 8, { message: 'The zipCode field must be exactly 8 digits' })
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  numberAddress: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsEnum(BrazilianStates, {
    message: 'The state field must be a valid Brazilian state',
  })
  uf: BrazilianStates;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cityUuid: string;
}
