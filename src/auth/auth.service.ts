<<<<<<< HEAD
import { HttpException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import {  AdminSignInDto, SignInDto, SignUpDto } from './dto/auth.dto';
=======
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
<<<<<<< HEAD
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { PassThrough } from 'stream';
import { Response } from '@nestjs/common';
import { json } from 'body-parser';


@Injectable()
export class AuthService {

 
 
  constructor(private userService: UsersService,private  adminservice:AdminService,
  private jwtService:JwtService) {}
   
  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env. secret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }}
  
=======

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
  async signUp(signUpDto: SignUpDto) {

    let row = await this.userService.findByEmailId(signUpDto.emailId);

    console.log('row ', row)
    if(row){
      throw new HttpException('The emailId is already exist', 400)
    }

    let password: string = signUpDto.password;
    console.log('password  =>', password);
    const hash = await argon2.hash(password);

    console.log('password  =>', password);
    console.log('password into hash =>', hash);

<<<<<<< HEAD
    const newUser = await this.userService.create({
      name: signUpDto.name,
      emailId: signUpDto.emailId,
      password: hash,
      phone:signUpDto.phone,
      dob:signUpDto.dob,
      address:signUpDto.address,
     
    });
   
    return { id: newUser.id, name: newUser.name,dob:newUser.dob, email: newUser.emailId,phone:newUser.phone,address:newUser.address

    };
  }

  async signIn(signInDto: SignInDto ) {
=======
    this.userService.create({
      userName: signUpDto.userName,
      emailId: signUpDto.emailId,
      password: hash,
      profile: signUpDto.profile,
    });

    let data = await this.userService.findByEmailId(signUpDto.emailId);

    return {id:data.id, name:data.name, emailId:data.emailId, profile:data.profile};
  }

  async signIn(signInDto: SignInDto) {
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b

    let row = await this.userService.findByEmailId(signInDto.emailId);

    if(row == null) {
      throw new HttpException('EmailId is not found', 400)
    }

    let result = await argon2.verify(row.password, signInDto.password)

    if(result == false) {
      throw new HttpException('incorrect password', 400)
<<<<<<< HEAD
      

    }


    const jwtToken = await this.jwtService.signAsync({ id: row.id });
    

    return { access_token: jwtToken, user: {
      id: row.id,
      user_name: row.name,
      emailId: row.emailId,
      phone: row.phone,
      dob: row.dob,
      address: row.address
    } };
  }



   async adminSignIn(adminSignInDto: AdminSignInDto) {
    
    let row = await this.adminservice.findByEmailId(adminSignInDto.admin_emailId);

    if(row == null) {
      throw new HttpException(' Admin EmailId is not found', 400)
    }
    console.log('Sign in row ',JSON.stringify(row))
    console.log('Admin DTo',JSON.stringify(adminSignInDto))

    let result = await argon2.verify(row.admin_password,adminSignInDto.admin_password)

    if(result == false) {
      throw new HttpException('incorrect password', 400)
    }


    

    return console.log("login sucessful");
  }
  }
  
 
=======
    }


    // jwt token need to generate 

    

    return 'password is valid';
  }
}
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
