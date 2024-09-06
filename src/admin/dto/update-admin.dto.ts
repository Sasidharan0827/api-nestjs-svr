import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @IsOptional()
  @IsString()
  @IsNotEmpty()
  admin_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  admin_dob: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  admin_emailId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  admin_password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  admin_address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  admin_phone: string;

}
