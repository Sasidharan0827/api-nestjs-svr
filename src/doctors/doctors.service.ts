import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  create(createDoctorDto: CreateDoctorDto) {
    return 'This action adds a new doctor';
  }

  findAll(searchText: string) {
    if (searchText == null) {
      return this.doctorRepository.find({ relations: ['consultations'] });
    } else {
      return this.doctorRepository
        .createQueryBuilder('doctor')
        .leftJoinAndSelect('doctor.consultations', 'c')
        .where('doctor.name LIKE :searchText', {
          searchText: `%${searchText}%`,
        })
        .orWhere('doctor.emailId LIKE :searchText', {
          searchText: `%${searchText}%`,
        })
        .orWhere('doctor.speciality LIKE :searchText', {
          searchText: `%${searchText}%`,
        })
        .getMany();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
