import { Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation } from './entities/consultation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConsultationsService {

  constructor( @InjectRepository(Consultation)
  private consRepository:Repository<Consultation>) {

  }
  create(createConsultationDto: CreateConsultationDto) {
    return 'This action adds a new consultation';
  }

  findAll() {
   return this.consRepository.find({relations:['doctor']})
  }

  findOne(id: number) {
    return `This action returns a #${id} consultation`;
  }

  update(id: number, updateConsultationDto: UpdateConsultationDto) {
    return `This action updates a #${id} consultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultation`;
  }
}
