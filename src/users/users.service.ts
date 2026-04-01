import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let password: string = createUserDto.password;
    console.log('password  =>', password);
    const hash = await argon2.hash(password);

    console.log('password  =>', password);
    console.log('password into hash =>', hash);
    'This action adds a new user' + JSON.stringify(createUserDto);
    return await this.usersRepository.save({
      name: createUserDto.name,
      dob: createUserDto.dob,
      address: createUserDto.address,
      emailId: createUserDto.emailId,
      password: hash,
      phone: createUserDto.phone,
    });
  }

  async findByEmailId(emailId: string) {
    return await this.usersRepository.findOne({ where: { emailId } });
  }

  async findAll(
    UserEmailSearch: string,
    UserNameSearch: string,
    UsearchPhoneSearch: string,
  ): Promise<User[]> {
    if (UserEmailSearch && UserEmailSearch.length > 0) {
      return await this.usersRepository.find({
        where: [{ emailId: Like(`%${UserEmailSearch}%`) }],
      });
    }

    if (UserNameSearch && UserNameSearch.length > 0) {
      return await this.usersRepository.find({
        where: [{ name: Like(`%${UserNameSearch}%`) }],
      });
    }

    if (UsearchPhoneSearch && UsearchPhoneSearch.length > 0) {
      return await this.usersRepository.find({
        where: [{ phone: Like(`%${UsearchPhoneSearch}%`) }],
      });
    }
    return await this.usersRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let data: any = {};

    if (updateUserDto.name) data.name = updateUserDto.name;

    if (updateUserDto.emailId) data.emailId = updateUserDto.emailId;

    if (updateUserDto.password) data.password = updateUserDto.password;

    if (updateUserDto.dob) data.dob = updateUserDto.dob;

    if (updateUserDto.address) data.address = updateUserDto.address;

    if (updateUserDto.phone) data.phone = updateUserDto.phone;

    let result = await this.usersRepository.update(id, data);

    return this.findOne(id);
  }
  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
