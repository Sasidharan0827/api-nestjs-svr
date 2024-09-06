import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto, CreateConsultationsDto, UpdateConsultationsDto, UpdatedConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

import { Like, Repository } from 'typeorm';
import { Consultation } from './entities/consultation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class ConsultationService {
 
  constructor( @InjectRepository(Consultation)
  private consRepository:Repository<Consultation>,)
  {}

  
  async create(createConsultationsDto: CreateConsultationsDto) {
   

     const consultations = [];
   

    for (const consultationDto of createConsultationsDto.data) {
      
        const consultation = this.consRepository.create({
            day: consultationDto.day,
            session: consultationDto.session,
            start_time: consultationDto.start_time,
            end_time: consultationDto.end_time,
            doc_id:consultationDto.doc_id,
        });

       
        const savedConsultation = await this.consRepository.save(consultation);

     
        consultations.push(savedConsultation);
    }

    return consultations;
}
  

 
async findOne(con_id: number): Promise<Consultation> {
  return this.consRepository.findOne({
    where: { con_id },
    relations: ['doctor'],
  });
}
  

  async update(doc_id: number, updatedConsultationDto:UpdateConsultationsDto) {
console.log("update api",JSON.stringify(updatedConsultationDto))
   for (let x of updatedConsultationDto.data)
    {
      let data:any={};
      if(x.day) data.day = x.day;

      if(x.session) data.session = x.session;
  
      if(x.start_time) data.start_time = x.start_time;
  
      if(x.end_time) data.end_time = x.end_time;
     
      if(x.con_id)data.con_id=x.con_id;
     
      let result = await this.consRepository.update(data.con_id, data);

    }

  

    return this.consRepository.findOne({
      where: { doc_id },
      relations: ['doctor'],
    });
  }

  remove(id: number) {
    return this.consRepository.delete(id);
  }


  async findAll(ConsultationSessionSearch:string,ConsultationDaySearch:string,ConsultationDateSearch:string): Promise<Consultation[]> {
    if (ConsultationSessionSearch && ConsultationSessionSearch.length > 0) {
      return await this.consRepository.find({
        where: [
          {           session: Like(`%${ConsultationSessionSearch}%`) },
          
        ],
        relations: ['doctor']
      });
    }

    if (ConsultationDaySearch && ConsultationDaySearch.length > 0) {
      return await this.consRepository.find({
        where: [
          {        day: Like(`%${ConsultationDaySearch}%`) },
          
        ],
        relations: ['doctor']
      });
    }

    if (ConsultationDateSearch && ConsultationDateSearch.length > 0) {
      return await this.consRepository.find({
        where: [
          {              start_time: Like(`%${ConsultationDateSearch}%`) },
          
        ],
        relations: ['doctor']
      });
    }
    return await this.consRepository.find({relations:['doctor']});
    
  }

  async findConsultations(doc_id: number, day: string, session: string): Promise<Consultation[]> {
    return this.consRepository.find({
      where: {
        doctor: { doc_id },
        day,
        session,
      },
      relations: ['doctor'],
    });
  }

  async findByDoctor(doc_id: number) {
    return await this.consRepository.find({ where: { doctor: { doc_id } }, relations: ['doctor'] });
  }

// async updateConsultation(doc_id: number, updateConsultationDto: UpdateConsultationDto) {
//   const { day, session, start_time, end_time, doc_id: new_doc_id } = updateConsultationDto;

//   const consultation = await this.consRepository.findOne({ where: { doc_id } });

//   if (!consultation) {
//     throw new NotFoundException(`Consultation with doc_id ${doc_id} not found.`);
//   }

//   if (day) consultation.day = day;
//   if (session) consultation.session = session;
//   if (start_time) consultation.start_time = start_time;
//   if (end_time) consultation.end_time = end_time;
//   if (new_doc_id) consultation.doc_id = new_doc_id;

//   const updatedConsultation = await this.consRepository.save(consultation);
//   return updatedConsultation;
// }

// async batchUpdate(updateConsultationDtos: UpdatedConsultationDto[]): Promise<Consultation[]> {
//   const updatedConsultations = [];

//   for (const dto of updateConsultationDtos) {
//     const consultation = await this.consRepository.findOne({ where: { con_id: dto.con_id } });
//     if (consultation) {
//       Object.assign(consultation, dto);
//       const savedConsultation = await this.consRepository.save(consultation);
//       updatedConsultations.push(savedConsultation);
//     }
//   }
  
//   return updatedConsultations;
// }
}