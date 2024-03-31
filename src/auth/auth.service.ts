import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

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

    let row = await this.userService.findByEmailId(signInDto.emailId);

    if(row == null) {
      throw new HttpException('EmailId is not found', 400)
    }

    let result = await argon2.verify(row.password, signInDto.password)

    if(result == false) {
      throw new HttpException('incorrect password', 400)
    }


    // jwt token need to generate 

    

    return 'password is valid';
  }
}
