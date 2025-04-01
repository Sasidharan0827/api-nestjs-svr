import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
    name?:string;
    dob?:string;
    address?:string;
  
      emailId?:string;
      password?:string;
      phone?:string;}


export class UpdateUserDto extends PartialType(CreateUserDto) {}
