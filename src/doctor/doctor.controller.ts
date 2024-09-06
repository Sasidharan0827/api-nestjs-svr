import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Public } from 'src/auth/auth.gaurd.';
import { AppModule } from 'src/app.module';
import { Doctor } from './entities/doctor.entity';
import { session } from 'passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('doctor')
export class DoctorController {

  constructor(private readonly doctorService: DoctorService) {}
  @Public()
  @Post()
  
  async create(@Body() createDoctorDto: CreateDoctorDto) {
   
    return this.doctorService.create(createDoctorDto);
  }
  @Public()
  @Get(':id/consultations/:day')
  async findConsultationsByDay(@Param('id') doc_id: number, @Param('day') day: string) {
    const doctor = await this.doctorService.findOne(+doc_id);
    const filteredConsultations = doctor.consultations.filter((consultation: any) => consultation.day.toLowerCase() === day.toLowerCase());
    return {
      doc_id: doctor.doc_id,
      docname: doctor.docname,
      consultations: filteredConsultations,
    };
  }

  @Public()
  @Get(':id/consultations/:day/:session')
  async sessiontime(
    @Param('id') doc_id: number,
    @Param('day') day: string,
    @Param('session') session: string,
  ) {
    const doctor = await this.doctorService.findOne(+doc_id);

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doc_id} not found`);
    }

    const filteredConsultations = doctor.consultations.filter((consultation: any) =>
      consultation.session.toLowerCase() === session.toLowerCase() && consultation.day.toLowerCase() === day.toLowerCase(),
    );

    if (filteredConsultations.length === 0) {
      throw new NotFoundException(`No consultations found for day '${day}' and session '${session}'`);
    }

    const consultationsData = filteredConsultations.map((consultation: any) => ({
      con_id: consultation.con_id,
      day: consultation.day,
      session: consultation.session,
      start_time: consultation.start_time,
      end_time: consultation.end_time,
    }));

    return {
      doc_id: doctor.doc_id,
      docname: doctor.docname,
      consultations: consultationsData,
    };
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') doc_id: number) {
    return this.doctorService.findOne(+doc_id);
  }
  @Public()
  @Patch(':doc_id')
  update(@Param('doc_id') doc_id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+doc_id, updateDoctorDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id')doc_id: string) {
    return this.doctorService.remove(+doc_id);
  }
  @Public()
  @Get()
  findAll(@Query('searchText') searchText:string ,
  @Query('docnamesearch') docnamesearch: string,
  @Query('specalist') specalist: string,) {
    console.log('searchText => ', searchText)
  
    return this.doctorService.findAll(searchText,docnamesearch,specalist);
    
  }
}

 

