import { Injectable } from '@nestjs/common';
import { CreateAppoinmentDto } from './dto/create-appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { Appoinment } from './entities/appoinment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AppoinmentService {
  constructor(
  
    @InjectRepository(Appoinment)
    private AppiontmentRepository: Repository<Appoinment>,
  ) {}
  
  async create(CreateAppoinmentDto: CreateAppoinmentDto) {
    'This action adds a new appoinment' + JSON.stringify(CreateAppoinmentDto);
    console.log('This action adds a new appoinment', CreateAppoinmentDto);
  
   const appointment =this.AppiontmentRepository.create({
 
    date: CreateAppoinmentDto.date,  

    userId:CreateAppoinmentDto.userId,
    con_id:CreateAppoinmentDto.con_id,
   })
   
    return await this.AppiontmentRepository.save(appointment);
  }
 

  findOne(id: number) {
    return this.AppiontmentRepository.findOne({ where: { id },
      relations: ['user', 'consultaion'],});
  }

  async update(id: number, createAppoinmentDto: CreateAppoinmentDto) {

    let data:any = {};

    
    if(createAppoinmentDto.date) data.date = createAppoinmentDto.date;

    

    if(createAppoinmentDto.userId) data.userId = createAppoinmentDto.userId;
    

    if(createAppoinmentDto.con_id) data.con_id = createAppoinmentDto.con_id;
   
    let result = await this.AppiontmentRepository.update(id, data);

    return this.findOne(id)
  }
  
  remove(id: number) {
    return this.AppiontmentRepository.delete(id);
  }
  // async findAll(AppointmentDoctorSearch:string,AppointmentNameSearch:string,AppointmentDateSearch:string): Promise<Appoinment[]> {
  //   if (AppointmentDoctorSearch && AppointmentDoctorSearch.length > 0) {
  //     return await this.AppiontmentRepository.find({
  //       where: [
  //         {       user: Like(`%${AppointmentDoctorSearch}%`) },
          
  //       ],
  //       relations: ['user',  'consultaion.doctor']
  //     });
  //   }

  //   if (AppointmentNameSearch && AppointmentNameSearch.length > 0) {
  //     return await this.AppiontmentRepository.find({
  //       where: [
  //         {       user : Like(`%${AppointmentNameSearch}%`) },
          
  //       ],
  //       relations: ['user',  'consultaion.doctor']
  //     });
  //   }

  //   if (AppointmentDateSearch && AppointmentDateSearch.length > 0) {
  //     return await this.AppiontmentRepository.find({
  //       where: [
  //         {          date : Like(`%${AppointmentDateSearch}%`) },
          
  //       ],
  //       relations: ['user',  'consultaion.doctor']
  //     });
  //   }
  //   return await this.AppiontmentRepository.find({
  //     relations: ['user',  'consultaion.doctor']});
  // }



  async findAll(
    AppointmentDoctorSearch: string,
    AppointmentNameSearch: string,
    AppointmentDateSearch: string
  ): Promise<Appoinment[]> {
    const queryBuilder = this.AppiontmentRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.user', 'user')
      .leftJoinAndSelect('appointment.consultaion', 'consultaion')
      .leftJoinAndSelect('consultaion.doctor', 'doctor');
  
    if (AppointmentDoctorSearch && AppointmentDoctorSearch.length > 0) {
      queryBuilder.andWhere('doctor.docname LIKE :doctorName', { doctorName: `%${AppointmentDoctorSearch}%` });
    }
  
    if (AppointmentNameSearch && AppointmentNameSearch.length > 0) {
      queryBuilder.andWhere('user.name LIKE :userName', { userName: `%${AppointmentNameSearch}%` });
    }
  
    if (AppointmentDateSearch && AppointmentDateSearch.length > 0) {
      queryBuilder.andWhere('appointment.date LIKE :appointmentDate', { appointmentDate: `%${AppointmentDateSearch}%` });
    }
  
    return await queryBuilder.getMany();
  }
}
