import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as argon2 from 'argon2';

@Injectable()
export class DoctorService {
  
  
  constructor(
  
    @InjectRepository(Doctor)
    private docRepository: Repository<Doctor>,
  ) {}
  async create(CreateDoctorDto: CreateDoctorDto) {
    const password: string = CreateDoctorDto.docpassword;
    console.log('Original password:', password);

    const hash = await argon2.hash(password);
    console.log('Hashed password:', hash);

    const doctor = this.docRepository.create({
      docname:CreateDoctorDto.docname,
      dob:CreateDoctorDto.dob,
      docemailId:CreateDoctorDto.docemailId,
      docpassword: hash,
     address:CreateDoctorDto.address,
     education:CreateDoctorDto.education,
     specalist:CreateDoctorDto.specalist,
     phonenumber:CreateDoctorDto.phonenumber,
     photo: CreateDoctorDto.photo,
     });

     console.log('Doctor to be saved:', doctor);
    return await this.docRepository.save(doctor);
  }


 
  findAll(searchText: string, docnamesearch: string, specalist: string): Promise<Doctor[]> {
    if (searchText&&docnamesearch&&specalist== null) {
      return this.docRepository.find({ relations: [' consultations'] });
    }

    const query = this.docRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.consultations', 'c');

    if (docnamesearch) {
      query.andWhere('doctor.docname LIKE :docnamesearch', {
        docnamesearch: `%${docnamesearch}%`,
      });
    }

    if (searchText) {
      query.andWhere('doctor.docemailId LIKE :searchText', {
        searchText: `%${searchText}%`,
      }).orWhere('doctor.specalist LIKE :searchText', {
        searchText: `%${searchText}%`,
      });
    }

    if (specalist) {
      query.andWhere('doctor.specalist LIKE :specalist', {
        specalist: `%${specalist}%`,
      });
    }

    return query.getMany();
   
  }
  async findOne(doc_id: number): Promise<Doctor> {
    const doctor = await this.docRepository.findOne({
      where: { doc_id },
      relations: ['consultations'],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doc_id} not found`);
    }
    return doctor;
  }


  // findOne(doc_id: number) {
  //   return this.docRepository.findOne({   where: { doc_id },
  //     relations: ['consultations'], });
  // }
 

  async update(doc_id: number, updateDoctorDto: UpdateDoctorDto) {

    let data:any = {};

    if(updateDoctorDto.docname) data.docname = updateDoctorDto.docname;

    if(updateDoctorDto.docemailId) data.docemailId = updateDoctorDto.docemailId;
    
    if(updateDoctorDto.docpassword) data.docpassword = updateDoctorDto.docpassword;

    if(updateDoctorDto.address) data.address = updateDoctorDto.address;

    if(updateDoctorDto.specalist) data.specalist = updateDoctorDto.specalist;

    if(updateDoctorDto.phonenumber) data.phonenumber = updateDoctorDto.phonenumber;

    if(updateDoctorDto.dob) data.dob = updateDoctorDto.dob;
 
    
    let result = await this.docRepository.update(doc_id, data);

    return this.findOne(doc_id)
  }
  remove(doc_id: number) {
    return this.docRepository.delete(doc_id);
  }
}



