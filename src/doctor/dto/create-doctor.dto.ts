import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
    @IsString()
    docname?:string;
    
    @IsString()
dob?:string;

@IsString()
address?:string;

@IsString()
education?:string;
@IsString()
specalist?:string;
    
@IsEmail()
docemailId?:string;

@IsString()
docpassword?:string;


@IsString()
phonenumber?:string;



}
  