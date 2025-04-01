import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
   
    docname?:string;
    

dob?:string;


address?:string;


education?:string;

specalist?:string;
    

docemailId?:string;

docpassword?:string;



phonenumber?:string;




}
  