import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Like, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as argon2 from 'argon2';
import { query } from 'express';


@Injectable()
export class AdminService {
  
  constructor(
  @InjectRepository(Admin)
  private Adminrepository:Repository<Admin>){}


  async create(createAdminDto: CreateAdminDto) {
    const password: string = createAdminDto.admin_password;
    console.log('Original password:', password);

    const hash = await argon2.hash(password);
    console.log('Hashed password:', hash);

    const admin = this.Adminrepository.create({
      admin_name: createAdminDto.admin_name,
      admin_dob: createAdminDto.admin_dob,
      admin_emailId: createAdminDto.admin_emailId,
      admin_password: hash,
      admin_address: createAdminDto.admin_address,
      admin_phone: createAdminDto.admin_phone,
    });

    return await this.Adminrepository.save(admin);
  }


  


 
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.Adminrepository.findOne({ where: { id: id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
  
    if (updateAdminDto.admin_name) {
      admin.admin_name = updateAdminDto.admin_name;
    }
    if (updateAdminDto.admin_dob) {
      admin.admin_dob = updateAdminDto.admin_dob;
    }
    if (updateAdminDto.admin_emailId) {
      admin.admin_emailId = updateAdminDto.admin_emailId;
    }
    if (updateAdminDto.admin_address) {
      admin.admin_address = updateAdminDto.admin_address;
    }
    if (updateAdminDto.admin_phone) {
      admin.admin_phone = updateAdminDto.admin_phone;
    }
  
    return await this.Adminrepository.save(admin);
  }

  remove(id: number) {
    return this.Adminrepository.delete(id);
  }
  findOne(id: number) {
    return this.Adminrepository.findOneBy({  id });
  }
  async findByEmailId(admin_emailId:string) {
    return await this.Adminrepository.findOne({where: {admin_emailId} })
  }
 
  async findAll(AdminEmailSearch?: string,phoneSearch?:string,AdminNameSearch?:string): Promise<Admin[]> {
    if (AdminEmailSearch && AdminEmailSearch.length > 0) {
      return await this.Adminrepository.find({
        where: [
          {   admin_emailId: Like(`%${AdminEmailSearch}%`) },
          
        ],
      });
    }
    if (phoneSearch && phoneSearch.length > 0) {
      return await this.Adminrepository.find({
        where: [
          {   admin_phone: Like(`%${phoneSearch}%`) },
          
        ],
      });
    }
    if (phoneSearch && phoneSearch.length > 0) {
      return await this.Adminrepository.find({
        where: [
          {   admin_phone: Like(`%${phoneSearch}%`) },
          
        ],
      });
    }
    if (AdminNameSearch && AdminNameSearch.length > 0) {
      return await this.Adminrepository.find({
        where: [
          {   admin_name: Like(`%${AdminNameSearch}%`) },
          
        ],
      });
    }
    return await this.Adminrepository.find();
  }

}
