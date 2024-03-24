import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    'This action adds a new user' + JSON.stringify(createUserDto);
    return await this.usersRepository.save({
      name: createUserDto.userName,
      emailId: createUserDto.emailId,
      password: createUserDto.password,
      profile: createUserDto.profile,
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    let data:any = {};

    if(updateUserDto.userName) data.name = updateUserDto.userName;

    if(updateUserDto.emailId) data.emailId = updateUserDto.emailId;
    
    if(updateUserDto.password) data.password = updateUserDto.password;
    
    if(updateUserDto.profile) data.profile = updateUserDto.profile;
    
    let result = await this.usersRepository.update(id, data);

    return this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
