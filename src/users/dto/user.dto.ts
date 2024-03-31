import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
    userName?:string;
    emailId?:string;
    password?:string;
    profile?:number;
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}
